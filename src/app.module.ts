import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppResolver } from './app.resolver';

import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        return {
          message:
            error.message != 'Bad Request Exception' ||
            error.extensions.originalError.message[0],
          code: error.extensions?.code || 'SERVER_ERROR',
        };
      },
    }),
    TypeOrmModule.forRoot({
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      type: 'postgres',
      database: process.env.DATABASE_USER,
      entities: [__dirname + '/entities/*.entity{.tx,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNC),
      dropSchema: true,
      port: 5432,
    }),
    AppResolver,
    TaskModule,
  ],
})
export class AppModule {}
