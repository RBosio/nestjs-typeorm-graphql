import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  @IsString({
    message: 'Title should be string',
  })
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
