import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { ProfileService } from 'src/profile/profile.service';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  // constructor is done, now the route handlers  ->

  async signUp(payload: CreateUserDto) {
    const { email, password } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existedUser = await this.repo.findOneBy({
      email,
    });
    if (existedUser) {
      throw new ConflictException('We already have an user with this email.');
    }
    const createdUser = await this.repo.create({
      email,
      hashedPassword,
    });
    const savedUser = await this.repo.save(createdUser);
    const savedUser_id = savedUser.id;
    const savedUserProfile = await this.profileService.create({
      user_id: savedUser_id,
    }); 
    return await this.generateTokens({
      email: savedUser.email,
      user_id: savedUser.id,
    });
  }

  async login(payload: CreateUserDto) {
    const { email, password } = payload;
    const user = await this.repo.findOneBy({
      email,
    });

    if (!user) {
      throw new NotFoundException('The user does not exist!');
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }
    return await this.generateTokens({
      email,
      user_id: user.id,
    });
  }

  async generateTokens(payload: { user_id: string; email: string }) {
    const accessToken = await this.jwtService.signAsync(
      {
        ...payload,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        ...payload,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15d',
      },
    );

    return { accessToken, refreshToken };
  }

  async refreshOldToken(payload: string) {
    try {
      const decodedCode = await this.jwtService.verifyAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const user = await this.repo.findOneBy({
        id: decodedCode.user_id,
      });

      if (!user) {
        throw new NotFoundException('No user is here with the given id');
      }

      return await this.generateTokens({
        user_id: user.id,
        email: user.email,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findUserById(id: string) {
    const user = await this.repo.findOneBy({
      id,
    });
    if (!user) {
      throw new NotFoundException('No user found with the given Id');
    }
    return user;
  }

  async changePassword(paylaod: ChangePasswordDto, user: User) {
    const { oldPassword, newPassword } = paylaod;
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.hashedPassword,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashedPassword = newHashedPassword;
    const savedUser = await this.repo.save(user);

    return this.generateTokens({
      user_id: savedUser.id,
      email: savedUser.email,
    });
  }
}
