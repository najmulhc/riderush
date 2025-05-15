import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from './entities/ride.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride) private repo: Repository<Ride>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
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
      status: 'Proposed',
    });
    return await this.repo.save(newRide);
  }

  async delete(id: string, user: User) {
    const ride = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: ['passenger'],
    });
    if (!ride) {
      throw new NotFoundException('NO ride found with this id.');
    }
    if (ride.status != 'Proposed') {
      throw new BadRequestException(
        'You can not delete this ride at this stage',
      );
    }
    const passenger = await this.profileService.getProfileByUserId(user.id);

    if (ride.passenger.id != passenger.id) {
      throw new ForbiddenException('You are not  the passenger of this ride.');
    }

    return this.repo.remove(ride);
  }

  async findRideById(id: string) {
    const ride = await this.repo.findOne({
      where: {
        id,
      },
      relations: ['rider', 'passenger'],
    });

    if (!ride) {
      throw new NotFoundException('No ride found with the Given Id');
    }
    return ride;
  }

  async acceptRide(riderUser: User, id: string) {
    const ride = await this.findRideById(id);

    if (ride.status != 'Proposed') {
      throw new ForbiddenException('The ride is already taken.');
    }

    const rider = await this.profileService.getProfileByUserId(riderUser.id);

    if (rider.id == ride.passenger.id) {
      throw new ForbiddenException('You can not be your own rider!');
    }

    ride.rider = rider;
    ride.status = 'Accepted';
    return await this.repo.save(ride);
  }

  async startRide(riderUser: User, id: string) {
    const ride = await this.findRideById(id);
    if (ride.status != 'Accepted') {
      throw new BadRequestException(
        'The ride is not ready to start or already started.',
      );
    }
    const rider = await this.profileService.getProfileByUserId(riderUser.id);
    if (rider.id != ride.rider.id) {
      throw new ForbiddenException('You are not the rider of the ride!');
    }
    ride.status = 'Running';

    return await this.repo.save(ride);
  }

  async completeRide(riderUser: User, id: string) {
    const ride = await this.findRideById(id);
    const rider = await this.profileService.getProfileByUserId(riderUser.id);
    if (rider.id != ride.rider.id) {
      throw new ForbiddenException('You are not the rider of the ride!');
    }
    if (ride.status != 'Running') {
      throw new BadRequestException('The ride is not started yet.');
    }

    ride.status = 'Completed';
    const savedRide = await this.repo.save(ride);
    const { cost } = savedRide;

    const passenger = await this.profileRepo.findOne({
      where: {
        id: savedRide.passenger.id
      },
      relations: [
        'ride'
      ]
    })

    passenger.ridesAsPassenger.push(ride); 
    const savedPassenger = await this.profileRepo.save(passenger);

    rider.balence += cost;

    const savedRider = await this.profileRepo.save(rider);

    return {
      savedRider, savedPassenger, savedRide
    };
  }
}
