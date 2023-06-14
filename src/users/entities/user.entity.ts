import {
  Column,
  Entity,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { BaseEntity } from '../../db/base-entity';
import { ERole } from '../enums/role.enum';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    name: 'email',
    unique: true,
  })
  @Index({ unique: true })
  email: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column()
  role: ERole;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;

  toJSON() {
    delete this.password;
    return this;
  }
}
