import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseURL";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "todos/fetchTasks",
  async (filter) => {
    const { data } = await axios.get(
      `${BASE_URL}/tasks${
        filter !== "all" ? `?completed=${filter === "completed"}` : ""
      }`
    );
    return data;
  }
);

export const addTask = createAsyncThunk("todos/addTask", async (text) => {
  const { data } = await axios.post(`${BASE_URL}/tasks`, {
    text,
    completed: false,
  });
  return data;
});

export const removeTask = createAsyncThunk("todos/removeTask", async (id) => {
  await axios.delete(`${BASE_URL}/tasks/${id}`);
  return id;
});

export const toggleTask = createAsyncThunk("todos/toggleTask", async (task) => {
  const updatedTask = { ...task, completed: !task.completed };
  await axios.put(`${BASE_URL}/tasks/${task.id}`, {
    ...updatedTask,
  });
  return updatedTask;
});

const initialState = {
  tasks: [],
  filter: "all",
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      });
  },
});

export const { setFilter } = todoSlice.actions;

export default todoSlice.reducer;
