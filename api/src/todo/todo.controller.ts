import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoDto } from './domain/todo';
import { TodoAddUsecase } from './usecases/todoAddUsecase';
import { TodoCompleteUsecase } from './usecases/todoCompleteUsecase';
import { TodoListUsecase } from './usecases/todoListUsecase.ts';
import { TodoRemoveUsecase } from './usecases/todoRemoveUsecase';
import { TodoReopenUsecase } from './usecases/todoReopenUsecase';

export type GetTodoListResponse = { todoList: TodoDto[] };
@Controller('/todos')
export class TodoController {
  constructor(
    @Inject(TodoAddUsecase) private todoAddUsecase: TodoAddUsecase,
    @Inject(TodoRemoveUsecase) private todoRemoveUsecase: TodoRemoveUsecase,
    @Inject(TodoCompleteUsecase)
    private todoCompleteUsecase: TodoCompleteUsecase,
    @Inject(TodoReopenUsecase) private todoReopenUsecase: TodoReopenUsecase,
    @Inject(TodoListUsecase) private todoListUsecase: TodoListUsecase,
  ) {}

  @Get()
  async getTodoList(): Promise<GetTodoListResponse> {
    const todoList = await this.todoListUsecase.execute();
    return { todoList: todoList };
  }

  @Post()
  async addTodo(@Body('title') title: string): Promise<{ todoId: string }> {
    const todoId = await this.todoAddUsecase.execute(title);
    return { todoId };
  }

  @Delete('/:id')
  async removeTodo(@Param('id') id: string): Promise<void> {
    await this.todoRemoveUsecase.execute(id);
  }

  @Put('/:id/complete')
  async completeTodo(
    @Param('id') id: string,
    @Query('completeTime') completeTime: string,
  ): Promise<void> {
    if (completeTime === 'null') {
      await this.todoReopenUsecase.execute(id);
    } else {
      await this.todoCompleteUsecase.execute(id, new Date(completeTime));
    }
  }
}
