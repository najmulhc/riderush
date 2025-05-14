import { IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ default: 0 })
  balence: number;

  @IsOptional()
  @Column({ default: 0 })
  rides: number;

  @Column({ default: 0 })
  riderReviewCount: number;

  @Column({ default: 0 })
  riderReviewAvg: number;

  @Column({ default: '' })
  name: String;

  @IsOptional()
  @Column({default: ""})
  profile_photo: string;
}
