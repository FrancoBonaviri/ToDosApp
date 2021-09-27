import { Router } from 'express';
import toDoRoutes from './toDo';
import usuarioRoutes from './usuario';


const routes = Router();

routes.use('/usuario', usuarioRoutes )

routes.use('/todos', toDoRoutes )


export default routes;