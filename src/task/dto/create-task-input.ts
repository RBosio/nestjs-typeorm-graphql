import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  @IsString({
    message: 'Title should be string',
  })
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @IsNumber(
    {},
    {
      message: 'userId should be int',
    },
  )
  @Field(() => Int)
  userId: number;
}
