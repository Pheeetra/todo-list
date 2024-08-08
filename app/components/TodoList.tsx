import React from 'react';
import { ITask } from "@/types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <table className="min-w-full leading-normal border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b border-gray-300 text-left">Tasks</th>
          <th className="py-2 px-4 border-b border-gray-300 text-right pr-11">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
