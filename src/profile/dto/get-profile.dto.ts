import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { GetRideDto } from 'src/ride/dto/get-ride.dto';

export class GetProfileDto {
  @Exclude()
  @Type(() => GetRideDto)
  ridesAsPassenger: GetRideDto[];

  @Expose()
  @Transform(({ obj }) => obj.ridesAsPassenger.length ?? 0)
  ridesAsPassengerCount: number;

  @Exclude()
  @Type(() => GetRideDto)
  ridesAsRider: GetRideDto;

  @Expose()
  @Transform(({ obj }) => obj.ridesAsRider.length ?? 0)
  ridesAsRiderCount: number;

  @Expose()
  riderReviewCount: number;

  @Expose()
  riderReviewAvg: number;

  @Expose()
  name: string;

  @Expose()
  profile_photo: string;

  @Expose()
  id: string;
}
