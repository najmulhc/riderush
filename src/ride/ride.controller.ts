import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateRideDto } from './dto/create-ride.dto';
import { GetRideDto } from './dto/get-ride.dto';
import { RideService } from './ride.service';

@UseGuards(AuthGuard)
@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  async createRide(@Body() body: CreateRideDto, @Req() req) {
    const result = await this.rideService.create(body, req.user);
    return plainToClass(GetRideDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/:id')
  async getRideInfo(@Param('id') id: string) {
    const ride = await this.rideService.findRideById(id);
    return plainToClass(GetRideDto, ride, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/:id/accept')
  async acceptRide(@Req() req, @Param('id') id: string) {
    const result = await this.rideService.acceptRide(req.user, id);

    return plainToClass(GetRideDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/:id/start')
  async startRide(@Req() req, @Param('id') id: string) {
    const result = await this.rideService.startRide(req.user, id);
    return plainToClass(GetRideDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/:id/complete')
  async completeRide(@Req() req, @Param('id') id: string) {
    const result = await this.rideService.completeRide(req.user, id);
    return result;
  }

  // the rider needs to find the last 10 rides to chose from
  @Get()
  async getRidesForRider() {
    return await this.rideService.getRidesForRider()
  }

  @Delete('/:id')
  async deleteRide(@Param('id') id: string, @Req() req) {
    return await this.rideService.delete(id, req.user);
  }
}
