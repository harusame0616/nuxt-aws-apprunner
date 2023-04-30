<script setup lang="ts">
const { todos, addTodo, removeTodo, toggleComplete } = useTodo();
const title = ref("");

const onSubmit = () => {
  if (!title.value) {
    return;
  }

  addTodo(title.value);
  title.value = "";
};

const onCheckboxChange = (id: string) => {
  toggleComplete(id);
};

const onDeleteClick = (id: string) => {
  removeTodo(id);
};
</script>

<template>
  <div>
    <h1>TODO SAMPLE</h1>
    <main>
      <form @submit.prevent="onSubmit">
        <label for="title">タイトル</label>
        <input type="text" v-model="title" id="title" />
        <button>add</button>
      </form>
      <section>
        <ul>
          <li
            v-for="todo of todos"
            :key="todo.id"
            :class="{ completed: !!todo.completeDate }"
          >
            <input
              type="checkbox"
              :checked="!!todo.completeDate"
              @change="onCheckboxChange(todo.id)"
              :id="todo.id"
            /><label :for="todo.id" class="label">{{ todo.title }}</label>
            <button type="button" @click="onDeleteClick(todo.id)">
              削除する
            </button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}

input[type="checkbox"] {
  cursor: pointer;
}
button {
  cursor: pointer;
}
.label {
  display: inline-block;
  min-width: 40px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
