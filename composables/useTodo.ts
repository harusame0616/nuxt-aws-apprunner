type Todo = {
  id: string;
  title: string;
  completeDate?: Date;
};

export const useTodo = () => {
  const todos = ref<Todo[]>([]);

  const addTodo = (title: string) => {
    todos.value.push({
      id: crypto.randomUUID(),
      title,
    });
  };

  const finishTodo = (id: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index < 0) {
      throw new Error("該当のTODOが見つかりません");
    }
    todos.value[index].completeDate = new Date();
  };

  const openTodo = (id: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index < 0) {
      throw new Error("該当のTODOが見つかりません");
    }
    todos.value[index].completeDate = undefined;
  };

  const toggleComplete = (id: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index < 0) {
      throw new Error("該当のTODOが見つかりません");
    }

    if (todos.value[index].completeDate) {
      finishTodo(id);
    } else {
      openTodo(id);
    }
  };

  const removeTodo = (id: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index < 0) {
      throw new Error("該当のTODOが見つかりません");
    }

    todos.value.splice(index, 1);
  };

  return {
    todos: readonly(todos),
    addTodo,
    finishTodo,
    openTodo,
    removeTodo,
    toggleComplete,
  };
};
