import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  email: string;
  @Expose()
  id: string;

  @Exclude()
  hashedPassword: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
