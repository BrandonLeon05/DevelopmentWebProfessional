import { Request, Response } from 'express';
import { dao } from '../dao/authDAO';
import { utils } from '../utils/utils';
import jwt from 'jsonwebtoken';
import secretKey from '../config/kwtKey';

class AuthController {

    // Nombre: Login
    // Descripción En este metodo se comprueban 
    // los datos de acceso del usuario
    public async login(req: Request, res: Response) {
        const { username, password } = req.body;

        //Validar campos vacios
        if (username == null || password == null)
            return res.status(400).json({message : "Los datos no pueden ser nulos"});
  
        const users = await dao.getUser(username);

        // Validar si ya existe el usuario
        if (users.length <= 0)
            return res.status(400).json({message : "El usuario no existe"});
        
        // Validar que la contraseña sea correcta
        for (let user of users) {
            if(await utils.checkPassword(password, user.password)){
                const token = jwt.sign({cveUsuario: user.cveUsuario, username}, secretKey.jwtSecret, {expiresIn: '1h'});
                return res.json({message: "OK", token, cveUsuario: user.cveUsuario, username});
                //console.log(token);
                //return res.json({message: "Funciona pariente"});
            } else {
                return res.status(400).json({message : "La constraseña es incorrecta"});
            }
        }


    }
}

export const authController = new AuthController();