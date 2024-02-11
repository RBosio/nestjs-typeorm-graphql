import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task-input';
import { GraphQLError } from 'graphql';
import { UpdateTaskInput } from './dto/update-task-input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        status: true,
      },
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const taskFound = await this.taskRepository.findOne({
      where: {
        id,
        status: true,
      },
      relations: {
        user: true,
      },
    });

    if (!taskFound)
      throw new GraphQLError('Task not found!', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });

    return taskFound;
  }

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const taskCreated = this.taskRepository.create(createTaskInput);

    const userFound = await this.userService.findOne(createTaskInput.userId);
    taskCreated.user = userFound;

    return this.taskRepository.save(taskCreated);
  }

  async update(id: number, task: UpdateTaskInput): Promise<Task> {
    const taskFound = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!taskFound)
      throw new GraphQLError('Task not found!', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });

    const taskUpdated = Object.assign(taskFound, task);

    return this.taskRepository.save(taskUpdated);
  }

  async delete(id: number): Promise<Task> {
    const taskFound = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!taskFound)
      throw new GraphQLError('Task not found!', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });

    taskFound.status = false;

    return this.taskRepository.save(taskFound);
  }
}
