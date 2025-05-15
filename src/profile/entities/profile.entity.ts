import { IsOptional } from 'class-validator';
import { Ride } from 'src/ride/entities/ride.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
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

  @Column({ default: 5000 })
  balence: number;

  @Column({ default: 0 })
  riderReviewCount: number;

  @Column({ default: 0 })
  riderReviewAvg: number;

  @Column({ default: 0 })
  passengerReviewCount: number;

  @Column({ default: 0 })
  passengerReviewAvg: number;

  @OneToMany(() => Ride, (ride) => ride.rider)
  ridesAsRider: Ride[];

  @OneToMany(() => Ride, (ride) => ride.passenger)
  ridesAsPassenger: Ride[];

  @Column()
  @Column({ default: '' })
  name: String;

  @IsOptional()
  @Column({ default: '' })
  profile_photo: string;
}
