"use client";

import { useEffect, useState } from 'react';
import { supabase } from './components/supabase';
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { ITask } from "@/types/tasks";
import Modal from './components/Modal';
import { FiPlus } from 'react-icons/fi';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        setTasks(data || []);
      }
      setLoading(false);
    };

    fetchTasks();

    const intervalId = setInterval(fetchTasks, 3000); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, tasks]);

  const handleAddTask = async (task: ITask) => {
    if (!task || !task.text) {
      console.error('Task text is required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ text: task.text, completed: task.completed || false }]);

      if (error) {
        console.error('Error adding task:', error.message);
      } else {
        setTasks(prevTasks => [...prevTasks, ...(data || [])]);
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
    setIsAddingTask(false);
  };

  const handleEditTask = async (id: string, newText: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ text: newText })
      .eq('id', id);
      setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));


  
  };

  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !completed })
      .eq('id', id);
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));

    
  };

  
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <button
          onClick={() => setIsAddingTask(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 mb-4"
        >
          <FiPlus size={20} />
          <span>Add Task</span>
        </button>
        <Modal isOpen={isAddingTask} onClose={() => setIsAddingTask(false)}>
          <AddTask onAdd={handleAddTask} tasks={tasks} onClose={() => setIsAddingTask(false)} />
        </Modal>
      </div>
      <div className="text-center my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <TodoList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </main>
  );
};

export default Home;
