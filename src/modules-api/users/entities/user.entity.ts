import { Exclude } from 'class-transformer';
import { users } from '@prisma/client';

export class UserEntity implements users {
  id!: number;
  email!: string;
  fullName!: string | null;
  age!: number | null;
  avatar!: string | null;
  roleId!: number;
  
  deletedBy!: number;
  isDeleted!: boolean;
  deletedAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;

  @Exclude()
  password!: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}