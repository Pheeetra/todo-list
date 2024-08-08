import React, { useState } from 'react';
import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import { FiEdit } from "react-icons/fi";

interface TaskActionsProps {
  task: ITask;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ task, onEdit, onDelete }) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedText.trim()) {
      onEdit(task.id, editedText);
      setOpenModalEdit(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleEditSubmit(e as any); 
    }
  };

  return (
    <>
      <td className="px-6 py-4 flex gap-5">
        <FiEdit
          cursor="pointer"
          size={20}
          className="text-blue-500"
          onClick={() => {
            setEditedText(task.text);
            setOpenModalEdit(true);
          }}
        />
        <Modal isOpen={openModalEdit} onClose={() => setOpenModalEdit(false)}>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Edit Task</h3>
            <form className="flex items-center space-x-2 mt-4" onSubmit={handleEditSubmit}>
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={handleKeyDown} 
                type="text"
                placeholder="Edit task"
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </form>
          </div>
        </Modal>
      </td>
    </>
  );
};

export default TaskActions;
