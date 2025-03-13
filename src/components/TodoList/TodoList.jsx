import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  removeTask,
  setFilter,
  toggleTask,
} from "../../store/todoSlice";

import styles from "./TodoList.module.scss";

import { useState } from "react";

export const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.tasks);
  const filter = useSelector((state) => state.todos.filter);
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className={styles.container}>
      <h2>Todo list</h2>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Новая задача"
          className={styles.input}
        />
        <button onClick={handleAddTask} className={styles.button}>
          Добавить
        </button>
      </div>

      <div className={styles.filters}>
        {["all", "active", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => dispatch(setFilter(type))}
            className={styles.filterButton}
            style={{
              backgroundColor: filter === type ? "#007bff" : "#ddd",
              color: filter === type ? "white" : "black",
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {filteredTasks.map((t, index) => (
          <li key={index} className={styles.listItem}>
            <span
              onClick={() => dispatch(toggleTask(index))}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => dispatch(removeTask(index))}
              className={styles.deleteButton}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
