import { useContext, useState } from 'react';
import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from '../api/tasks.api';
import { TaskContext } from './TaskContext';

//Create own hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskContextProvider');
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  //Store tasks
  const [tasks, setTasks] = useState([]);

  //Load all tasks
  async function loadTasks() {
    const response = await getTasksRequest();
    setTasks(response.data);
  }

  //Delete one task
  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Create a task
  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Get one task
  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //Update one task
  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Toggle task done
  const toggleTaskDone = async (id) => {
    try {
      console.log('id: ', id);
      const taskFound = tasks.find((task) => task.id === id);

      await toggleTaskDoneRequest(id, taskFound.done === 0 ? true : false);

      tasks.map((task) =>
        task.id === id ? (task.done = task.done === 0 ? 1 : 0) : task.done
      );

      setTasks([...tasks]);
    } catch (error) {
      console.log(error);
    }
  };

  //Export to submodules
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
