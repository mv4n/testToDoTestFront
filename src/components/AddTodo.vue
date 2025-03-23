<template>
  <div>
    <input v-model="newTask" placeholder="Enter task..." />
    <button @click="addTask">Add Task</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    async addTask() {
      if (!this.newTask.trim()) return;
      await fetch("http://127.0.0.1:8001/todos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: this.newTask, completed: false }),
      });
      this.newTask = "";
      this.$emit("taskAdded");
    },
  },
};
</script>