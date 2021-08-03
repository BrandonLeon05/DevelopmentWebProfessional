import {Request, Response } from 'express';
import { dao } from '../dao/usuarioDAO';
import { utils } from '../utils/utils';

class UsuarioController {

    // Nombre: lista
    // Descripción: Lista de los usuarios creados en la BD
    // Resultado: json con información de los usuarios
    public async lista(req: Request, res: Response){
        const result = await dao.lista();

        res.json(result);
    }

    // Nombre: insert
    // Descripción: Inserta datos de usuario
    // Resultado: json con msj
     public async insert(req: Request, res: Response){
        const { nombre, apellidos, username, password } = req.body;

       
        if (nombre == null || apellidos == null || username == null || password == null){
            return res.status(409).json({message: 'Los campos son requeridos'});
        }

        const encryptedPassword = await utils.hashPassword(password);

        const user = {
            //claveUsuario,
            nombre,
            apellidos,
            username,
            password : encryptedPassword,
        }

        const result = await dao.insert(user);

        if(result.affectedRows > 0)
            return res.json({message: 'Datos Guardados'});
        else
            return res.status(400).json({message: result.message});
        
        res.json(result);
    }
}

export const usuarioController = new UsuarioController();