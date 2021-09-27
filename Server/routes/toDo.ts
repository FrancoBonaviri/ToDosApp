import { Router } from 'express';
import { body } from 'express-validator';
import { toDoController } from '../controllers/toDoController';
import { BodyValidator, tokenValidator, existToDo, validCriticalityToDo, validCompleteToDo } from '../middleware/middleware';

const toDoRoutes = Router();

toDoRoutes.get('/', [
    tokenValidator
], toDoController.getAll)

toDoRoutes.get('/anteriores', [
    tokenValidator
], toDoController.getAllAnteriores)


toDoRoutes.post('/', [
    tokenValidator,
    body('Name', 'Debe indicar el nombre del toDo,').notEmpty(),
    body('Description', 'Debe indicar la descripcion del toDo,').notEmpty(),
    body('LimitDate', 'Debe indicar la fecha limite  del toDo,').notEmpty(),
    body('Criticality', 'Debe indicar la criticidad del toDo,').notEmpty(),
    BodyValidator,
    validCriticalityToDo
], toDoController.craete);

toDoRoutes.put('/:id', [
    tokenValidator,
    existToDo,
    validCompleteToDo
], toDoController.markAsDone)

toDoRoutes.delete('/:id', [
    tokenValidator,
    existToDo
], toDoController.delete)

export default toDoRoutes;