import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({
    message: 'Name cannot be empty',
  })
  @IsString({
    message: 'Name should be string',
  })
  @Field(() => String)
  name: string;

  @IsNotEmpty({
    message: 'Lastname cannot be empty',
  })
  @IsString({
    message: 'Lastname should be string',
  })
  @Field(() => String)
  lastname: string;

  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  @IsString({
    message: 'Email should be string',
  })
  @IsEmail(
    {},
    {
      message: 'Email is not valid',
    },
  )
  @Field(() => String)
  email: string;

  @IsNotEmpty({
    message: 'Password cannot be empty',
  })
  @IsString({
    message: 'Password should be string',
  })
  @MinLength(6, {
    message: 'Password must be greater than or equal to 6 characters',
  })
  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
