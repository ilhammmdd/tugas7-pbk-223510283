<template>
  <div class="todo-container">
    <div class="todo-app">
      <h1>TUGAS 7 TODO LIST</h1>
      <h2>PINIA</h2>
      <form @submit.prevent="addTodo" class="todo-form">
        <input v-model="newTodo" required placeholder="New todo" class="todo-input">
        <button type="submit" class="todo-button">Add Todo</button>
      </form>

      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <input type="checkbox" v-model="todo.done" class="todo-checkbox">
          <span :class="{ done: todo.done }" class="todo-text">{{ todo.text }}</span>
          <button @click="removeTodo(todo)" class="delete-button">X</button>
        </li>
      </ul>

      <p class="pesan">{{ pesan }}</p>
      <p class="incomplete-tasks">Total incomplete tasks: {{ incompleteTodosCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTodoStore } from './stores/useTodoStore';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();
const { todos, incompleteTodosCount } = storeToRefs(todoStore);

const newTodo = ref('');

const addTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
};

const removeTodo = (todo) => {
  todoStore.removeTodo(todo);
};

const pesan = ref('');
watch(newTodo, (newTodoValue) => {
  if (newTodoValue.includes('?')) {
    pesan.value = 'Tidak boleh mengandung ?';
  } else {
    pesan.value = '';
  }
});
</script>

<style scoped>
h1{
  text-align: center;
}

h2{
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #F5F7F8;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 250px;
}

.todo-app {
  width: 100%;
  text-align: left;
}

.todo-form {
  margin-bottom: 20px;
}

.todo-input {
  width: calc(100% - 20px);
  padding: 12px;
  margin-bottom: 10px;
  border: none;
  background-color: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  color: black;
}

.todo-input:focus {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.todo-input::placeholder {
  color: black;
}

.todo-button {
  background-color: #F4CE14;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
}

.todo-button:hover {
  background-color: #4d4209;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.todo-checkbox {
  margin-right: 10px;
}

.todo-text {
  flex: 1;
  font-size: 18px;
  color: #333;
}

.todo-text.done {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  background-color: #F44336;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.delete-button:hover {
  background-color: #B71C1C;
}

.pesan {
  font-style: italic;
  color: #F44336;
  text-align: center;
}

.incomplete-tasks {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
}
</style>

<style>

body{
  background-image: url('https://img.freepik.com/free-photo/gray-watercolor-textured-background-design_53876-108267.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1717372800&semt=ais_user');
}

</style>