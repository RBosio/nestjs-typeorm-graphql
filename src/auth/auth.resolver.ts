import {
  Args,
  Field,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => LoginResponse)
  login(@Args('loginInput') loginInput: LoginInput): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }
}
