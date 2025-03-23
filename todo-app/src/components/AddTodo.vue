<template>
  <div>
    <h2>Додати задачу</h2>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" type="text" placeholder="Введіть задачу" required />
      <button type="submit">Додати</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTodo", // Це ім'я компонента
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodo() {
      // Надсилаємо нову задачу в батьківський компонент (App.vue)
      this.$emit('add-todo', this.newTodo);
      this.newTodo = ""; // Очищаємо поле введення
    },
  },
};
</script>

<style scoped>
/* Стили для форми */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
}

input {
  padding: 8px;
  font-size: 14px;
}

button {
  padding: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
