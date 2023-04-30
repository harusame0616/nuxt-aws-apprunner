import { Inject } from '@nestjs/common';
import { TodoDto } from '../domain/todo';
import { TODO_REPOSITORY_KEY } from '../todo.constanta';
import { TodoRepository } from './repository';

export class TodoListUsecase {
  constructor(
    @Inject(TODO_REPOSITORY_KEY) private todoRepository: TodoRepository,
  ) {}

  async execute(): Promise<TodoDto[]> {
    const todoList = await this.todoRepository.list();

    return todoList.map((todo) => todo.toDto());
  }
}
