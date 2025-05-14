import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports : [JwtModule, TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [UserService, ConfigService, ProfileService],
})
export class UserModule {}
