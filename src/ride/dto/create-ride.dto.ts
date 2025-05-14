import { IsPositive, IsString } from "class-validator";

export class CreateRideDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsPositive()
  cost: number;
}
