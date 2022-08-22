import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/tasks.routes.js';

//Initializate app
const app = express();

//Create constant dirname (indicates where index.js is located)
const __dirname = dirname(fileURLToPath(import.meta.url));

//Middleware
app.use(express.json());
app.use(cors());

//Routes
//app.use(indexRoutes); //testing
app.use(taskRoutes);

//Distrition of static files
app.use(express.static(join(__dirname, '../client/dist')));

//Listen at port
app.listen(PORT);
//console.log(`Server is listening in port ${PORT}`);
