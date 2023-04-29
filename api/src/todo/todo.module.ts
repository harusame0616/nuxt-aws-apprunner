import { Module } from '@nestjs/common';
import { IMTodoRepository } from './infra/repositories/imTodoRepository';
import { TODO_REPOSITORY_KEY } from './todo.constanta';
import { TodoController } from './todo.controller';
import { TodoAddUsecase } from './usecases/todoAddUsecase';
import { TodoCompleteUsecase } from './usecases/todoCompleteUsecase';
import { TodoListUsecase } from './usecases/todoListUsecase.ts';
import { TodoRemoveUsecase } from './usecases/todoRemoveUsecase';
import { TodoReopenUsecase } from './usecases/todoReopenUsecase';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    {
      provide: TODO_REPOSITORY_KEY,
      useClass: IMTodoRepository,
    },
    TodoAddUsecase,
    TodoCompleteUsecase,
    TodoReopenUsecase,
    TodoRemoveUsecase,
    TodoListUsecase,
  ],
})
export class TodoModule {}
