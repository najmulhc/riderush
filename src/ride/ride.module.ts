import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { ProfileService } from 'src/profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Ride, Profile , User]),
    JwtModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
