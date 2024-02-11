import {
  Args,
  Context,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { CreateUserInput } from 'src/user/dto/create-user-input';
import { UserService } from 'src/user/user.service';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
}

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => User)
  signup(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => LoginResponse)
  login(@Args('loginInput') loginInput: LoginInput): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  session(@Context('user') user: User): User {
    return user;
  }
}
