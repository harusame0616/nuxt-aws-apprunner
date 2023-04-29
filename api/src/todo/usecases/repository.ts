import { Todo } from '../domain/todo';

export type TodoRepository = {
  insert(todo: Todo): Promise<void>;
  save(todo: Todo): Promise<void>;
  findOneById(todoId: string): Promise<Todo>;
  list(): Promise<Todo[]>;
  deleteById(todoId: string): Promise<void>;
};
