import { createSlice } from "@reduxjs/toolkit";

const loadLocalStorage = () => {
  const data = localStorage.getItem("tasks");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initState = {
  tasks: loadLocalStorage(),
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initState,
  reducers: {
    addTask(state, { payload }) {
      state.tasks.push({ text: payload, completed: false });
      saveToLocalStorage(state.tasks);
    },
    removeTask(state, { payload }) {
      state.tasks = state.tasks.filter((_, i) => i !== payload);
      saveToLocalStorage(state.tasks);
    },
    toggleTask(state, { payload }) {
      state.tasks[payload].completed = !state.tasks[payload].completed;
      saveToLocalStorage(state.tasks);
    },
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { addTask, removeTask, toggleTask, setFilter } = todoSlice.actions;

export default todoSlice.reducer;
