import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { hash, compare } from 'bcryptjs';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  lastname: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Task, (task) => task.user)
  @Field(() => [Task], { nullable: true })
  tasks: Task[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    } else {
      this.password = await hash(this.password, 10);
    }
  }

  async comparePassword(password: string) {
    if (await compare(password, this.password)) {
      return true;
    } else {
      return false;
    }
  }
}
