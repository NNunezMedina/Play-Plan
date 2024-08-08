import * as React from "react";
import s from "./Authenticated.module.css";
import { BadgeAlert, Trash2 } from "lucide-react";
import { filterTasks, sortTasks } from "./utils";
import { useAuth } from "../../contexts/authContext";
import { createTask, deleteTask, editTask, getTasks } from "../../services/tasks";
import "ldrs/tailspin";
import Button from "../Button/Button";
import styles from "../Button/Button.module.css";

function Authenticated() {
  const { logout } = useAuth();
  const [status, setStatus] = React.useState("idle");
  const [formStatus, setFormStatus] = React.useState("idle");
  const [tasks, setTasks] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("due_date-asc");
  const [filters, setFilters] = React.useState({ onlyPending: false, onlyImportant: false})

  React.useEffect(() => {
    setStatus("loading");

    getTasks()
      .then((dataTasks) => {
        setTasks(dataTasks);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setStatus("failed");

        if (error.message.includes("No autorizado")) {
          logout();
        }
      });
  }, [logout]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = Object.fromEntries(formData.entries());

    setFormStatus("loading");

    createTask(taskData)
    .then((newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setFormStatus("success");
      event.target.reset();
    })
    .catch((error) => {
      console.error('Failed to create task:', error);
      setFormStatus('failed')
    })
  }

  async function handleEdit(id, updates) {
    editTask(id, updates)
    .then((updatedTask) => {
      setTasks((prevTasks) => 
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      )
    })
    .catch((error) => {
      console.error("Failed to edit task:", error)
    })
  }

  async function handleDelete(id) {
    deleteTask(id)
    .then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    })
    .catch((error) => {
      console.error("Failed to delete task:", error)
    })
  }

  const isLoading = status === "loading";
  const isCreating = formStatus === "loading";


  const filteredTasks = filterTasks(tasks, filters);
  const sortedTasks = sortTasks(filteredTasks, sortBy);


  return (
    <>
      <form className={s["task-form"]} onSubmit={handleSubmit}>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="do the dishes"
          required
          aria-label="title"
          disabled={isCreating}
        />
        <input
          id="due_date"
          type="date"
          name="due_date"
          aria-label="due_date"
          disabled={isCreating}
        />
        <Button disabled={isCreating}>
          {isCreating ? "Adding..." : "Add task"}
        </Button>
      </form>

      <div className={s["tasks-wrapper"]}>
        <aside className={s.aside}>
          <div className={s["input-group"]}>
            <label htmlFor="sort_by">Sort by</label>
            <select id="sort_by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="due_date-asc">Due Date (old first)</option>
              <option value="due_date-desc">Due Date (new first)</option>
              <option value="alphabetical-asc">Alphabetical (a-z)</option>
              <option value="alphabetical-desc">Alphabetical (z-a)</option>
            </select>
          </div>
          <div className={s["input-group"]}>
            <label>Filter</label>
            <div className={s.checkbox}>
              <input 
              type="checkbox" 
              id="pending" 
              checked = {filters.onlyPending}
              onChange={(e) => setFilters({ ...filters, onlyPending: e.target.checked })}
              />
              <label htmlFor="pending">Only pending</label>
            </div>
            <div className={s.checkbox}>
              <input 
              type="checkbox" 
              id="important" 
              checked={filters.onlyImportant}
              onChange={(e) => setFilters({ ...filters, onlyImportant: e.target.checked })}
              />
              <label htmlFor="important">Only important</label>
            </div>
          </div>
          <Button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </aside>
        <div className={s["tasks-list"]}>
          {isLoading && (
              <l-tailspin
                size="40"
                stroke="5"
                speed="0.9"
                color="black"
              ></l-tailspin>
          )}
          {tasks.length > 0 &&
            sortedTasks.map((task) => (
              <div key={task.id} className={s["task-wrapper"]}>
                <div className={s["task-data"]}>
                  <input
                    type="checkbox"
                    id={task.id}
                    checked={task.completed}
                    onChange={() => {
                      const updates = { completed: !task.completed};
                      handleEdit(task.id, updates)
                    }}
                  />
                  <div className={s["title-wrapper"]}>
                    <label htmlFor={task.id} className={s["task-title"]}>
                      {task.title}
                    </label>
                    <small className={s["task-due_date"]}>
                      {task["due_date"]}
                    </small>
                  </div>
                </div>
                <div className={s.actions}>
                  <Button
                  className={`${styles.icon} ${task.important ? s.importantButton : ""}`}
                    onClick={() => {
                      const updates = { important: !task.important };
                      handleEdit(task.id, updates)
                    }}
                  > 
                    <BadgeAlert />
                  </Button>
                  <Button
                  className={`${styles.icon}`}
                    onClick={() => {
                      handleDelete(task.id)
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Authenticated;
