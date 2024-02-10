import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ nullable: true, type: 'text' })
  @Field(() => String, { nullable: true })
  description: string;

  @Column({ default: true })
  status: boolean;
}
