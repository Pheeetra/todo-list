import { ITask } from "@/types/tasks";

const baseUrl = 'http://localhost:3004';

// Fetch all tasks
export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
};

// Add a new task
export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  const newTodo = await res.json();
  return newTodo;
};

// Update an existing task
export const updateTodo = async (id: string, updatedTask: Partial<ITask>): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  });
  const updated = await res.json();
  return updated;
};

// Delete a task
export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE',
  });
};

// Toggle task completion
export const toggleComplete = async (id: string, completed: boolean): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  });
  const updated = await res.json();
  return updated;
};
