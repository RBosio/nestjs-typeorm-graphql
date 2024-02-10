import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task-input';
import { GraphQLError } from 'graphql';
import { UpdateTaskInput } from './dto/update-task-input';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        status: true,
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const taskFound = await this.taskRepository.findOne({
      where: {
        id,
        status: true,
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
    const task = this.taskRepository.create(createTaskInput);
    return this.taskRepository.save(task);
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

    const updateTask = Object.assign(taskFound, task);

    return this.taskRepository.save(updateTask);
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
