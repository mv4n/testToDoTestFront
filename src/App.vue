<template>
  <div id="app">
    <h1>To-Do List</h1>
    <AddToDo @taskAdded="handleTaskAdded" />
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.text }} - {{ task.completed ? 'Completed' : 'Not Completed' }}
      </li>
    </ul>
  </div>
</template>

<script>
import AddToDo from './components/AddTodo.vue';

export default {
  components: {
    AddToDo
  },
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      const response = await fetch("http://127.0.0.1:8001/todos/");
      if (response.ok) {
        this.tasks = await response.json();
      }
    },
    handleTaskAdded(newTask) {
      this.tasks.push(newTask); // Додаємо задачу до списку
    }
  }
};
</script>

<style>
h1 {
  text-align: center;
}
</style>
