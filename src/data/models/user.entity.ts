import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Image } from "./image.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(() => Image, (image) => image.user)
    images?: Image[];

    constructor(id: number) {
        this.id = id;
    }
}
