import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { updateProfileDto } from './dto/update-profile.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private repo: Repository<Profile>) {}

  async create(payload: CreateProfileDto) {
    const { user_id } = payload;

    const existedProfile = await this.repo.findOne({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: ['user'],
    });
    if (existedProfile) {
      throw new ConflictException('The user already has a profile!');
    }

    const newProfile = await this.repo.create({
      user: {
        id: user_id,
      },
    });

    return await this.repo.save(newProfile);
  }

  async getProfileByUserId(userId: string) {
    const profile = await this.repo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user', 'ridesAsRider', 'ridesAsPassenger'],
    });

    if (!profile) {
      throw new NotFoundException(
        'There is no profile associated with the user.',
      );
    }

    return profile;
  }

  async update(id: string, payload: updateProfileDto) {
    let profile = await this.getProfileByUserId(id);
    profile = { ...profile, ...payload };

    return await this.repo.save(profile);
  }

  // only can be used by the account file, you can not delete the profile by your own
  async delete(id: string) {
    const profile = await this.getProfileByUserId(id);
    return 'string';
  }
}
