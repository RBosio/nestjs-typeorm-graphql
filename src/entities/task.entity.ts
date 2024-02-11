import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ nullable: true, type: 'text' })
  @Field(() => String, { nullable: true })
  description: string;

  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  @Field(() => User, { nullable: true })
  user: User;
}
