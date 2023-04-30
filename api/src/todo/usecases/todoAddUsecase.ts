import { Inject } from '@nestjs/common';
import { Todo } from '../domain/todo';
import { TODO_REPOSITORY_KEY } from '../todo.constanta';
import { TodoRepository } from './repository';

export class TodoAddUsecase {
  constructor(
    @Inject(TODO_REPOSITORY_KEY) private todoRepository: TodoRepository,
  ) {}

  async execute(title: string): Promise<string> {
    const todo = Todo.create(title);
    await this.todoRepository.insert(todo);

    return todo.id;
  }
}
