import { User } from "src/users/model/user.interface";
import {PrimaryGeneratedColumn, Entity, Column, ManyToOne} from "typeorm";
import { PartState } from "./part.interface";
import { UserEntity } from "src/users/model/user.entity";

@Entity()
export class PartEntity{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    description?: string;

    @Column()
    state?: PartState;

    @Column()
    reference?: string ;

    @Column()
    quantity?: number;

    @Column()
    price?: number;

    @Column()
    imgUrl?: string;

    @ManyToOne(type=>UserEntity, UserEntity=>UserEntity.parts)
    user?: User;
}