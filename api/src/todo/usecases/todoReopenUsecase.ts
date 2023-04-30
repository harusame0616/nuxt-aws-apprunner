import { Inject } from '@nestjs/common';
import { TODO_REPOSITORY_KEY } from '../todo.constanta';
import { TodoRepository } from './repository';

export class TodoReopenUsecase {
  constructor(
    @Inject(TODO_REPOSITORY_KEY) private todoRepository: TodoRepository,
  ) {}

  async execute(id: string) {
    const todo = await this.todoRepository.findOneById(id);

    todo.reopen();
    this.todoRepository.save(todo);
  }
}
