import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo, TodoDto } from 'src/todo/domain/todo';
import { TodoRepository } from 'src/todo/usecases/repository';

const store: { [key: string]: TodoDto } = {};

@Injectable()
export class IMTodoRepository implements TodoRepository {
  async insert(todo: Todo): Promise<void> {
    if (store[todo.id]) {
      throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
    }
    store[todo.id] = todo.toDto();
  }

  async save(todo: Todo): Promise<void> {
    store[todo.id] = todo.toDto();
  }

  async findOneById(todoId: string): Promise<Todo> {
    const todoDto = store[todoId];
    if (!todoDto) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    return Todo.fromDto(todoDto);
  }

  async list(): Promise<Todo[]> {
    return Object.values(store).map((todoDto) => Todo.fromDto(todoDto));
  }

  async deleteById(todoId: string): Promise<void> {
    delete store[todoId];
  }
}
