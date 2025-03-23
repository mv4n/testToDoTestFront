<template>
  <v-list-item>
    <v-checkbox :model-value="todo.completed" @change="toggleTodo(todo.id, !todo.completed)" />
    <v-btn @click="deleteTodo(todo.id)">🗑</v-btn>
  </v-list-item>
</template>

<script>
import { useTodoStore } from '@/store/todoStore';

export default {
  props: ['todo'],
  setup(props) {
    const store = useTodoStore();
    return {
      toggleTodo: store.toggleTodo,
      deleteTodo: store.deleteTodo,
    };
  },
};
</script>
