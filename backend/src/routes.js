import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import ToolController from './app/controllers/ToolController';

const upload = multer(multerConfig);
const routes = new Router();

// login or store routes
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// auth middleware
routes.use(authMiddleware);

// user routes
routes.put('/users/:id', UserController.update);

// file routes
routes.post('/files', upload.single('file'), FileController.store);

// tools routes
routes.post('/tools', ToolController.store);
routes.get('/tools', ToolController.index);
routes.put('/tools/:id', ToolController.update);
routes.delete('/tools/:id', ToolController.destroy);

export default routes;
