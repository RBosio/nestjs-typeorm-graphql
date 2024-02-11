import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login-input';
import { UserService } from 'src/user/user.service';
import { LoginResponse } from './auth.resolver';
import { GraphQLError } from 'graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    const userFound = await this.userService.findOneByEmail(loginInput.email);

    if (!(await userFound.comparePassword(loginInput.password))) {
      throw new GraphQLError('Email or password incorrect!', {
        extensions: {
          code: HttpStatus.UNAUTHORIZED,
        },
      });
    }

    return {
      token: await this.jwtService.signAsync({
        sub: userFound.id,
      }),
    };
  }
}
