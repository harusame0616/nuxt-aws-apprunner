import { Inject } from '@nestjs/common';
import { TODO_REPOSITORY_KEY } from '../todo.constanta';
import { TodoRepository } from './repository';

export class TodoCompleteUsecase {
  constructor(
    @Inject(TODO_REPOSITORY_KEY) private todoRepository: TodoRepository,
  ) {}

  async execute(id: string, completeTime: Date) {
    const todo = await this.todoRepository.findOneById(id);

    todo.complete(completeTime);
    this.todoRepository.save(todo);
  }
}
