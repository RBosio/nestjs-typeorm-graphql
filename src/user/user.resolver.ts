import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from './dto/create-user-input';
import { UpdateUserInput } from './dto/update-user-input';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
