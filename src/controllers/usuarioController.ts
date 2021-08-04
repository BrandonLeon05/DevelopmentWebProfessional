import {Request, Response } from 'express';
import { dao } from '../dao/usuarioDAO';
import pool from '../database/database';
import { utils } from '../utils/utils';

class UsuarioController {

    // Nombre: lista
    // Descripción: Lista de los usuarios creados en la BD
    // Resultado: json con información de los usuarios
    public async lista(req: Request, res: Response){
        try{
            const result = await dao.lista();
            res.json(result);
        } catch (error) {
            res.status(500).json({message: error.message})
        } 
    }

    // Nombre: insert
    // Descripción: Inserta datos de usuario
    // Resultado: json con msj
    public async insert(req: Request, res: Response){

        try{
            const { nombre, apellidos, username, password } = req.body;

            // Validación de los campos.
            if (nombre == null || apellidos == null || username == null || password == null){
                return res.status(409).json({message: 'Los campos son requeridos'});
            }

            // Verificar la longitud de los caracteres
            if (username.length > 20)
                return res.status(500).json({message: "El limite de caracteres para username son 20"});

            const verify = await dao.verificarUsuario(username);    

            // Verificar si el usuario existe 
            if(verify.length > 0) 
                return res.status(500).json({ message : "El usuario ya existe"});

            // Encriptación de contraseña
            const encryptedPassword = await utils.hashPassword(password);

            // 
            const user = {
                //claveUsuario,
                nombre,
                apellidos,
                username,
                password : encryptedPassword,
            }

            //Insercion de los datos de usuario.
            const result = await dao.insert(user);

            if(result.affectedRows > 0)
                return res.json({message: 'Datos Guardados'});
            else
                return res.status(400).json({message: result.message});
            
            res.json(result);
        } catch (ex) {
            res.status(500).json({message: ex.message})
        }
    }
}

export const usuarioController = new UsuarioController();