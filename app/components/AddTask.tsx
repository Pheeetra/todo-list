import React, { useState } from 'react';
import { ITask } from '@/types/tasks';
import { v4 as uuidv4 } from 'uuid';

interface AddTaskProps {
  onAdd: (task: ITask) => void;
  onClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd, onClose }) => {
  const [taskValue, setTaskValue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskValue.trim()) {
      onAdd({ id: uuidv4(), text: taskValue, completed: false });
      setTaskValue('');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      {/* <h2 className="text-xl font-semibold mb-4">Add New Task</h2> */}
      <input
        type="text"
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
        placeholder="Enter task..."
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      <div className="flex justify-end gap-2">
      
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddTask;
