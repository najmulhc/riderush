import { Expose } from 'class-transformer';

export class PassengerProfileDto {
  @Expose()
  rides: number;

  @Expose()
  passengerReviewCount: number;

  @Expose()
  passengerReviewAvg: number;

  @Expose()
  name: string;

  @Expose()
  profile_photo: string;

  @Expose()
  id: string;
}
