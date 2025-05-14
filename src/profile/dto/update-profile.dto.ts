import { IsOptional, IsString } from 'class-validator';

export class updateProfileDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profile_photo: string;
}
