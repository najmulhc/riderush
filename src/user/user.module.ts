import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [JwtModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
