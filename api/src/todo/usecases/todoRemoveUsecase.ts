import { Inject } from '@nestjs/common';
import { TODO_REPOSITORY_KEY } from '../todo.constanta';
import { TodoRepository } from './repository';

export class TodoRemoveUsecase {
  constructor(
    @Inject(TODO_REPOSITORY_KEY) private todoRepository: TodoRepository,
  ) {}

  async execute(id: string) {
    await this.todoRepository.deleteById(id);
  }
}
