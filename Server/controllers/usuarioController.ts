import { User } from '../models/usuario';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class UsuarioController {


    public getById = async ( req: Request, res: Response ) => {

        const id = req.params.id;

        try {
            
            let user = await User.findById(id);


            return res.json({
                ok: true,
                user
            });


        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });   
        }


    }


    public craete = async ( req: Request, res: Response ) => {

        const { UserName, Email, Password } = req.body;


        try {

            //cript the password => 
            const hash = bcrypt.hashSync(Password, 10)

            const user = {
                UserName,
                Email,
                Password: hash
            }


            const userDb = await User.create(user);


            return res.json({
                ok: true,
                Usuario: userDb
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }


    public login =  async ( req: Request, res: Response ) => {
        
        const { Email, Password } = req.body;

        try {

            
            let user = await User.findOne({Email : Email });

            if( !user  ) {
                return res.json({
                    ok: false,
                    err: 'Usuario o contrasena incorrecta'
                });
            }

            if( !bcrypt.compareSync(Password, user.Password ) ){
                return res.json({
                    ok: false,
                    err: 'Usuario o contrasena incorrecta'
                });
            }


            let token = jwt.sign({Email}, process.env.PRIVATE_KEY_JWT || "RANDOM_KEY");

            return res.json({
                ok: true,
                user,
                token
            });
            
        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }


    } 


}


export const usuarioController = new UsuarioController();