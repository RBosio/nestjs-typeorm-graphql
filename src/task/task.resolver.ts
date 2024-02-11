import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from 'src/entities/task.entity';
import { CreateTaskInput } from './dto/create-task-input';
import { UpdateTaskInput } from './dto/update-task-input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [Task])
  getTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Query(() => Task)
  getTask(@Args('id') id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return this.taskService.create(createTaskInput);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('id') id: number,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskInput);
  }

  @Mutation(() => Task)
  deleteTask(@Args('id') id: number): Promise<Task> {
    return this.taskService.delete(id);
  }
}
