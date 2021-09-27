import { ToDo } from "../models/toDo";
import { Request, Response } from 'express'

class ToDoController {
    

    public getAll = async(req: Request, res: Response) => {
        try {
            

            const toDos = await ToDo.find({ Completed: false });
            return res.json({
                ok: true,
                ToDos: toDos
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    public getAllAnteriores = async(req: Request, res: Response) => {
        try {
            

            const toDos = await ToDo.find({ Completed: true });
            return res.json({
                ok: true,
                ToDos: toDos
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    public craete = async(req: Request, res: Response) => {

        const { Name, Description, LimitDate, Criticality } = req.body;

        try {
            
            let toDo = {
                Name,
                Description, 
                Completed: false,
                CreationDate: new Date(),
                LimitDate, 
                User: req.body.User.id,
                Criticality, 
            }

            let toDoDB = await ToDo.create( toDo );

            return res.json({
                ok: true,
                ToDo: toDoDB
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    public markAsDone = async(req: Request, res: Response) => {

        let id = req.params.id;

        try {

            let toDoDB = await ToDo.findByIdAndUpdate(id, { Completed: true, CompletedDate: new Date() }, { new: true })

            return res.json({
                ok: true,
                ToDo: toDoDB
            });
            
        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }


    }

    public delete = async(req: Request, res: Response) => {
        let id = req.params.id;

        try {

            await ToDo.findByIdAndDelete(id);

            return res.json({
                ok: true,
                message: 'El toDo fue eliminado correctamente'
            });
            
        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

}




export const toDoController = new ToDoController();