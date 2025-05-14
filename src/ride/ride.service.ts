import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride } from './entities/ride.entity';
import { CreateRideDto } from './dto/create-ride.dto';
import { User } from 'src/user/entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride) private repo: Repository<Ride>,
    private profileService: ProfileService,
  ) {}

  async create(rideInfo: CreateRideDto, passenger: User) {
    const profile = await this.profileService.getProfileByUserId(passenger.id);
    const { cost } = rideInfo;
    if (cost > profile.balence) {
      throw new BadRequestException(
        'Insufficient funds, you do not have enough money!',
      );
    }
    const newRide = await this.repo.create({
      ...rideInfo,
      passenger: profile,
      status: "Proposed"
    });
    return await this.repo.save(newRide);
  }
}
