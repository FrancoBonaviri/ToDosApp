import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import { tokenValidator, craeteUserValidator } from "../middleware/middleware";



const usuarioRoutes = Router();


usuarioRoutes.get('/:id',[ tokenValidator ], usuarioController.getById);
usuarioRoutes.post('/', [ craeteUserValidator ], usuarioController.craete);
usuarioRoutes.post('/login', usuarioController.login);


export default usuarioRoutes;