import { IsString } from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  from: string;

  @Column()
  @IsString()
  to: string;

  @Column()
  cost: number;

  @ManyToOne(() => Profile, (profile) => profile.ridesAsRider)
  rider: Profile;
  @ManyToOne(() => Profile, (profile) => profile.ridesAsPassenger)
  passenger: Profile;

  @Column()
  status: 'Proposed' | 'Accepted' | 'Running' | 'Completed';

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    const time = new Date();
    this.createdAt = time;
    this.updatedAt = time;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    const time = new Date();
    this.updatedAt = time;
  }
}
