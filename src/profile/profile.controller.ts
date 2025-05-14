import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetProfileDto } from './dto/get-profile.dto';
import { updateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseInterceptors(new Serialize(GetProfileDto))
  @Get('/:id')
  async getProfile(@Param('id') id: string) {
    return await this.profileService.getProfileByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateProfile(@Req() req ,   @Body() body: updateProfileDto , @Param('id') id: string)  {
    const { user } = req;
    if (user.id != id) {
      throw new ForbiddenException("You are not the owner of the account.")
    }
  }
}
