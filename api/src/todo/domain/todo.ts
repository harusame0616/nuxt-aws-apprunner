import * as crypto from 'crypto';

export type TodoDto = {
  id: string;
  title: string;
  completeDate?: Date;
};

export class Todo {
  private data: TodoDto;

  private constructor(todoDto: TodoDto) {
    this.data = { ...todoDto };
  }

  static create(title: string) {
    return new Todo({
      id: crypto.randomUUID(),
      title,
    });
  }

  complete(completeTime: Date) {
    this.data.completeDate = completeTime;
  }

  reopen() {
    this.data.completeDate = undefined;
  }

  get id() {
    return this.data.id;
  }

  static fromDto(todoDto: TodoDto) {
    return new Todo(todoDto);
  }

  toDto() {
    return { ...this.data };
  }
}
