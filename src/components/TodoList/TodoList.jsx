import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  removeTask,
  setFilter,
  toggleTask,
} from "../../store/todoSlice";

import styles from "./TodoList.module.scss";

import { useState, useEffect } from "react";

export const TodoList = () => {
  const dispatch = useDispatch();
  const { tasks, filter, loading } = useSelector((state) => state.todos);
  const [task, setTask] = useState("");

  useEffect(() => {
    dispatch(fetchTasks(filter));
  }, [dispatch, filter]);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

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
        {tasks.map((t) => (
          <li key={t.id} className={styles.listItem}>
            <span
              onClick={() => dispatch(toggleTask(t))}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => dispatch(removeTask(t.id))}
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
