import { Router } from 'express';
const router = Router();
import {
  getTask,
  createTask,
  deleteTask,
  updateTask,
  getTasks,
} from '../controllers/tasks.controller.js';

router.get('/tasks', getTasks);

router.get('/tasks/:id', getTask);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

export default router;
