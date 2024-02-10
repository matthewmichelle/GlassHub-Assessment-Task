import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../models/user.entity";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  filename: string;

  
  @ManyToOne(() => User, user => user.images)
  @JoinColumn({ name: "userId" })
  user: User; // Define the relationship with the User entity

  // Additional properties
  @Column({ nullable: true , type: 'real' })
  latitude: number;

  @Column({ nullable: true  , type: 'real'})
  longitude: number;

  constructor(id: number) {
    this.id = id
  }
}
