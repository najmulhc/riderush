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
  UseInterceptors,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateRideDto } from './dto/create-ride.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetRideDto } from './dto/get-ride.dto';
import { plainToClass } from 'class-transformer';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

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
    return result
  }

  @Post('/:id/review/rider')
  async reviewRiderbyPassenger() {}
  @Post('/:id/review/passenger')
  async reviewPassengerByRider() {}

  @Delete('/:id')
  async deleteRide(@Param('id') id: string, @Req() req) {
    return await this.rideService.delete(id, req.user);
  }
}
