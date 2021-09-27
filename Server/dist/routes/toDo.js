"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var toDoController_1 = require("../controllers/toDoController");
var middleware_1 = require("../middleware/middleware");
var toDoRoutes = express_1.Router();
toDoRoutes.get('/', [
    middleware_1.tokenValidator
], toDoController_1.toDoController.getAll);
toDoRoutes.get('/anteriores', [
    middleware_1.tokenValidator
], toDoController_1.toDoController.getAllAnteriores);
toDoRoutes.post('/', [
    middleware_1.tokenValidator,
    express_validator_1.body('Name', 'Debe indicar el nombre del toDo,').notEmpty(),
    express_validator_1.body('Description', 'Debe indicar la descripcion del toDo,').notEmpty(),
    express_validator_1.body('LimitDate', 'Debe indicar la fecha limite  del toDo,').notEmpty(),
    express_validator_1.body('Criticality', 'Debe indicar la criticidad del toDo,').notEmpty(),
    middleware_1.BodyValidator,
    middleware_1.validCriticalityToDo
], toDoController_1.toDoController.craete);
toDoRoutes.put('/:id', [
    middleware_1.tokenValidator,
    middleware_1.existToDo,
    middleware_1.validCompleteToDo
], toDoController_1.toDoController.markAsDone);
toDoRoutes.delete('/:id', [
    middleware_1.tokenValidator,
    middleware_1.existToDo
], toDoController_1.toDoController.delete);
exports.default = toDoRoutes;
