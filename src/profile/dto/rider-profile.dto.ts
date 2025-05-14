import { Expose } from 'class-transformer';

export class RiderProfileDto {
  @Expose()
  rides: number;

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
