"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuarioController_1 = require("../controllers/usuarioController");
var middleware_1 = require("../middleware/middleware");
var usuarioRoutes = express_1.Router();
usuarioRoutes.get('/:id', [middleware_1.tokenValidator], usuarioController_1.usuarioController.getById);
usuarioRoutes.post('/', [middleware_1.craeteUserValidator], usuarioController_1.usuarioController.craete);
usuarioRoutes.post('/login', usuarioController_1.usuarioController.login);
exports.default = usuarioRoutes;