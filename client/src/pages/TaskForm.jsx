import { Form, Formik } from 'formik';
import { useTasks } from '../context/TaskProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskForm() {
  //useState hook
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  //Custom hook
  const { createTask, getTask, updateTask } = useTasks();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        enableReinitialize='true'
        initialValues={task}
        onSubmit={async (values, actions) => {
          console.log(values);
          //check if needs to create or edit
          if (params.id) {
            await updateTask(params.id, values);
          } else {
            await createTask(values);
          }
          navigate('/');
          //reset form
          setTask({
            title: '',
            description: '',
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className='bg-slate-300 max-w-sm rounded-sm p-4 mx-auto mt-10'
          >
            <h1 className='text-xl font-bold uppercase text-center'>
              {params.id ? 'Edit Task' : 'Create Task'}
            </h1>
            <label className='block'>Title: </label>
            <input
              className='px-2 py-1 rounded-sm w-full'
              type='text'
              name='title'
              placeholder='write a title'
              onChange={handleChange}
              value={values.title}
            />

            <label className='block'>Description:</label>
            <textarea
              name='description'
              rows='3'
              placeholder='write a description'
              onChange={handleChange}
              value={values.description}
              className='px-2 py-1 rounded-sm w-full'
            ></textarea>
            <button
              className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-sm'
              disabled={isSubmitting}
              type='submit'
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
