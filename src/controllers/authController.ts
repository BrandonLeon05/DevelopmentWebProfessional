import { Request, Response } from 'express';
import { dao } from '../dao/authDAO';
import { utils } from '../utils/utils';

class AuthController {
    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body;
        if (usuario == null || password == null)
            return res.status(400).json({message : "Los datos no pueden ser nulos"});
        
        const users = await dao.getUsuer(usuario);
        if (users.length <= 0)
            return res.status(400).json({message : "El usuario no existe"});
        for (let user of users) {
            if(await utils.checkPassword(password, user.password)){

            } else {
                return res.status(400).json({message : "La constraseña es incorrecta"});
            }
        }
    }
}

export const authController = new AuthController();