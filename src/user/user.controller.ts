import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.userService.signUp(createUserDto);
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return {
      accessToken,
    };
  }

  @Post('/login')
  async login(
    @Body() payload: CreateUserDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.userService.login(payload);
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return {
      accessToken,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/refresh-tokens')
  async refreshOldToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const oldRefreshToken = req.cookies['refresh-token'];
    if (!oldRefreshToken) {
      throw new UnauthorizedException('No refresh Token given');
    }
    const { accessToken, refreshToken } =
      await this.userService.refreshOldToken(oldRefreshToken);
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return {
      accessToken,
    };
  }

  @UseGuards(AuthGuard)
  @Patch("/change-password")
  async changePassword(@Body() body: ChangePasswordDto,@Req() req , @Res({
    passthrough: true
  }) res: Response) {
    const { user } = req;
    const { accessToken, refreshToken } =
      await this.userService.changePassword(body, user);
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return {
      accessToken,
    };
  }
}
