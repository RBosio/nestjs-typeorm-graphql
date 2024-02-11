import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user-input';
import { GraphQLError } from 'graphql';
import { UpdateUserInput } from './dto/update-user-input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        status: true,
      },
      relations: {
        tasks: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
        status: true,
      },
      relations: {
        tasks: true,
      },
    });

    if (!userFound)
      throw new GraphQLError('User not found!', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });

    return userFound;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const userCreated = this.userRepository.create(createUserInput);
    return this.userRepository.save(userCreated);
  }

  async update(id: number, user: UpdateUserInput): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound)
      throw new GraphQLError('User not found!', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });

    const userUpdated = Object.assign(userFound, user);

    return this.userRepository.save(userUpdated);
  }

  async delete(id: number): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound)
      throw new GraphQLError('User not found!', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });

    userFound.status = false;

    return this.userRepository.save(userFound);
  }
}
