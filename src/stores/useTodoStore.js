import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

let id = 0;

export const useTodoStore = defineStore('todoStore', () => {
  const todos = ref([]);

  const addTodo = (text) => {
    todos.value.push({ id: id++, text, done: false });
  };

  const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t.id !== todo.id);
  };

  const incompleteTodosCount = computed(() => {
    return todos.value.filter((todo) => !todo.done).length;
  });

  return { todos, addTodo, removeTodo, incompleteTodosCount };
});
