import { Part } from 'src/parts/model/part.interface';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user.interface';
import { PartEntity } from 'src/parts/model/part.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column()
  address?: string;

  @Column()
  enterprise?: string;

  @Column()
  phone?: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role?: UserRole;

  @OneToMany(type => PartEntity, (PartEntity) => PartEntity.user)
  parts?: Part[];
}
