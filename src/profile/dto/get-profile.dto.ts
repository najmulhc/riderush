import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Ride } from 'src/ride/entities/ride.entity';

export class GetProfileDto {
  @Expose()
  rides: number;


 
  ridesAsPassenger: any[];

  @Expose()
  get ridesAsPassengerCount() {
    return this.ridesAsPassenger?.length ?? 0;
  }

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
