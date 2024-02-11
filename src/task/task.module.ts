import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
