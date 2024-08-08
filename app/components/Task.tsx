import React, { useState } from 'react';
import { ITask } from "@/types/tasks";
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { IoMdCheckbox, IoMdSquare } from 'react-icons/io';

interface TaskProps {
  task: ITask;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="py-2 px-4">
        {task.completed ? (
          <span className="line-through">{task.text}</span>
        ) : (
          <span>{task.text}</span>
        )}
      </td>
      <td className="py-2 px-4 text-right">
        <button
          onClick={() => onToggleComplete(task.id, task.completed)}
          className={`p-2 mr-2 rounded ${task.completed ? 'text-red-500' : 'text-green-500'}`}
        >
          {task.completed ? <IoMdSquare size={20} /> : <IoMdCheckbox size={20} />}
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 mr-2 rounded text-blue-500"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded text-gray-500"
        >
          <FaTrashAlt size={20} />
        </button>
        {isEditing && (
          <div className="absolute bg-white border border-gray-300 p-4 rounded shadow-lg">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handleEdit}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Task;
