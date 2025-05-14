import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  hashedPassword: string;

  @Column({
    nullable: true
  })
  createdAt: Date;

  @Column({
    nullable: true
  })
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
