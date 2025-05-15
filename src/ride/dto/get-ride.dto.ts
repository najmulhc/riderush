import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PassengerProfileDto } from 'src/profile/dto/passenger-profile.dto';
import { RiderProfileDto } from 'src/profile/dto/rider-profile.dto';

export class GetRideDto {
  @Expose()
  id: string;

  @Expose()
  from: string;

  @Expose()
  to: string;

  @Expose()
  cost: number;

  @Expose()
  @Type(() => PassengerProfileDto)
  passenger: PassengerProfileDto;

  @Expose()
  @Type(() => RiderProfileDto)
  rider: RiderProfileDto;

  @Expose()
  status: 'Proposed' | 'Accepted' | 'Running' | 'Completed';

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
