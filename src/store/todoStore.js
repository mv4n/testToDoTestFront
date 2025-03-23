import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
    }),
    actions: {
        async fetchTodos() {
            const response = await axios.get('http://localhost:8000/todos');
            this.todos = response.data;
        },
        async addTodo(title) {
            await axios.post('http://localhost:8000/todos', { title });
            this.fetchTodos();
        },
        async toggleTodo(id, completed) {
            await axios.put(`http://localhost:8000/todos/${id}`, { completed });
            this.fetchTodos();
        },
        async deleteTodo(id) {
            await axios.delete(`http://localhost:8000/todos/${id}`);
            this.fetchTodos();
        },
    },
});
