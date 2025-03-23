<template>
  <div>
    <input v-model="taskText" placeholder="New task" />
    <button @click="addTask">Add Task</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.text }} - {{ task.completed ? "Completed" : "Not Completed" }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskText: "",
      tasks: [],
    };
  },
  methods: {
    async addTask() {
      if (this.taskText.trim() === "") return; // Перевірка, чи текст не порожній

      const newTask = {
        id: Date.now(), // Генерація унікального id для задачі
        text: this.taskText,
        completed: false,
      };

      try {
        // Відправка POST запиту на сервер для додавання нової задачі
        const response = await fetch("http://127.0.0.1:8001/todos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          this.tasks.push(newTask); // Додаємо задачу в список локально
          this.taskText = ""; // Очищаємо поле вводу
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
  },
  async created() {
    try {
      const response = await fetch("http://127.0.0.1:8001/todos/");
      const tasks = await response.json();
      this.tasks = tasks;
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  },
};
</script>
