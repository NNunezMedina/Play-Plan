import { apiFetch } from "./api-fetch";

export function getTasks() {
    return apiFetch("/tasks");
}

export function createTask(taskData) {
    return apiFetch("/tasks", {body: taskData})
}

export function deleteTask(id) {
    return apiFetch("/tasks/" + id, {method:"DELETE"})
}