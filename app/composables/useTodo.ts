import type { GetTodoListResponse } from "../../api/dist/todo/todo.controller";

export const useTodo = () => {
  const todoApi = useNuxtApp().$apiBaseUrl + "/todos";

  const { data: todoListResponse, refresh } =
    useLazyFetch<GetTodoListResponse>(todoApi);

  const addTodo = async (title: string) => {
    await $fetch(todoApi, { method: "POST", body: { title } });
    await refresh();
  };

  const finishTodo = async (id: string) => {
    const completeTime = new Date();
    console.log("finish");
    await $fetch(todoApi + `/${id}/complete`, {
      method: "PUT",
      query: { completeTime: completeTime.toDateString() },
    });
    await refresh();
  };

  const openTodo = async (id: string) => {
    await $fetch(todoApi + `/${id}/complete`, {
      method: "PUT",
      query: { completeTime: null },
    });
    await refresh();
  };
  const todos = computed(() => todoListResponse.value?.todoList ?? []);

  const toggleComplete = async (id: string) => {
    if (!todos.value) {
      throw new Error("読み込み中です");
    }

    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index < 0) {
      throw new Error("該当のTODOが見つかりません");
    }

    if (todos.value[index].completeDate) {
      await openTodo(id);
    } else {
      await finishTodo(id);
    }
  };

  const removeTodo = async (id: string) => {
    await $fetch(todoApi + `/${id}`, { method: "DELETE" });
    await refresh();
  };

  return {
    todos,
    addTodo,
    finishTodo,
    openTodo,
    removeTodo,
    toggleComplete,
  };
};
