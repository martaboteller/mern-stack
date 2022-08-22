import { useEffect } from 'react';
import { useTasks } from '../context/TaskProvider';
import TaskCard from '../components/TaskCard';

function TasksPage() {
  //Custom hook
  const { tasks, loadTasks } = useTasks();

  //Lets you perform side effects in function components
  useEffect(() => {
    loadTasks();
  }, []);

  //Render taskcards
  function renderMain() {
    if (tasks.length === 0) return <h1>No tasks yet</h1>;
    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  }

  return (
    <div>
      <h1 className='text-5xl text-white font-bold text-center py-3 mb-2'>
        Tasks
      </h1>
      <div className='grid grid-cols-3 gap-2'>{renderMain()}</div>
    </div>
  );
}

export default TasksPage;
