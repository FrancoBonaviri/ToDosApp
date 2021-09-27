import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CriticalityToDo, ToDo } from "../models/toDo";
import { User } from "../models/usuario";



export const BodyValidator = ( req: Request, res: Response, next: NextFunction ) => {

    const errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.json({
            ok: false,
            errors: errors.array()
        });
    }
    

    next();
}

export const tokenValidator = async ( req: Request, res: Response, next: NextFunction ) => {


    const token  = req.header('x-token');
    console.log(req.headers)

    if( ! token ) {
        return res.status(401).json();
    }


    try {
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY_JWT || "RANDOM_KEY",  );
        decoded = decoded as JwtPayload;

        if( ! decoded?.Email ) {
            return res.status(401).json();
        }

        let user = await User.findOne({ Email : decoded.Email });
        if( !user ) {
            return res.status(401).json();
        }

        req.body.User =  user;

        next();
    } catch (error) {
        return res.status(401).json();
    }


}


export const craeteUserValidator = async ( req: Request, res: Response, next: NextFunction ) =>{
    
    
    try {
        
        const {UserName, Email, Password, PasswordRepeat} = req.body;

        if( Password !== PasswordRepeat ){
            return res.json({
                ok: false,
                err: 'Las contrasenas no coinciden.'
            });
        }

        if( !! (await User.findOne({ Email: Email })) ) {
            return res.json({
                ok: false,
                err: 'Ya existe un usuario con el email: ' + Email
            });
        }

        if( !! (await User.findOne({ UserName: UserName })) ) {
            return res.json({
                ok: false,
                err: 'Ya existe un usuario con el nombre de usuario: ' + UserName
            });
        }

        
        next()
    } catch (error) {
        return res.status(500).json(error.message)
    }

}


export const existToDo = async ( req: Request, res: Response, next: NextFunction ) => {


    const id = req.params.id


    try {
        let toDo = await ToDo.findById(id);
    
        if( !toDo ){
            return res.status(400).json({
                ok: false,
                err: 'El toDo no existe.'
            });
        }
    
    
        next();
        
    } catch (error) {
        return res.json({
            ok: false,
            err: error.message
        });        
    }


}


export const validCriticalityToDo = async ( req: Request, res: Response, next: NextFunction ) => {


    const { Criticality } = req.body


    if( Criticality != 0 && Criticality != 1 && Criticality != 2  ) {
        return res.json({
            ok: false,
            err: `Debe indicar una criticidad validad para el todo. 0: ${CriticalityToDo[0]}, 1: ${CriticalityToDo[1]}, 2: ${CriticalityToDo[2]}`
        })
    }

    next();


}


export const validCompleteToDo = async ( req: Request, res: Response, next: NextFunction ) => {


    const id = req.params.id

    const todo = await ToDo.findById(id);
    console.log(todo)
    if( !todo || todo.Completed ) {
        return res.json({
            ok: false,
            err: `Debe indicar un valido para el cambio de estado.`
        })
    }

    next();


}