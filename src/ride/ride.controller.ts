import {
  Body,
  Controller,
  Delete,
  Get,
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

@UseGuards(AuthGuard)
@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

//  @UseInterceptors(new Serialize(GetRideDto))
  @Post()
  async createRide(@Body() body: CreateRideDto, @Req() req) {
    const result = await this.rideService.create(body, req.user);
    return plainToClass(GetRideDto, result , {
excludeExtraneousValues: true
    })
  }

  @Get('/:id')
  async getRideInfo() {}

  @Patch('/:id/accept')
  async acceptRide() {}
  @Patch('/:id/start')
  async startRide() {}
  @Patch('/:id/complete')
  async completeRide() {}

  @Post('/:id/review/rider')
  async reviewRiderbyPassenger() {}
  @Post('/:id/review/passenger')
  async reviewPassengerByRider() {}

  @Delete('/:id')
  async deleteRide() {}
}
