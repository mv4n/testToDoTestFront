<template>
  <div class="add-todo">
    <input
        v-model="taskText"
        type="text"
        placeholder="Enter a new task"
        @keyup.enter="addTask"
        :disabled="isLoading"
    />
    <button @click="addTask" :disabled="isLoading">
      Add Task
    </button>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskText: "", // Текст нової задачі
      isLoading: false, // Статус для завантаження
    };
  },
  methods: {
    async addTask() {
      if (this.taskText.trim() === "") return; // Якщо текст порожній, не додавати задачу

      const newTask = {
        id: Date.now(), // Унікальний id для нової задачі
        text: this.taskText,
        completed: false, // Початковий стан задачі
      };

      try {
        this.isLoading = true; // Починаємо завантаження
        const response = await fetch("http://127.0.0.1:8001/todos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          this.$emit("taskAdded", newTask); // Сповіщаємо батьківський компонент про додавання задачі
          this.taskText = ""; // Очищаємо поле вводу
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      } finally {
        this.isLoading = false; // Завершення завантаження
      }
    },
  },
};
</script>

<style scoped>
.add-todo {
  margin: 20px;
  text-align: center;
}

input {
  padding: 10px;
  width: 70%;
  margin-right: 10px;
}

button {
  padding: 10px;
  cursor: pointer;
}

div {
  color: gray;
  margin-top: 10px;
}
</style>
