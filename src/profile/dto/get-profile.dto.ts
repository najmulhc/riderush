import { Expose } from 'class-transformer';

export class GetProfileDto {
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
