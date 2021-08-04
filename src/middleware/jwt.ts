import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKey'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Obtener token
    const token = String(req.headers['auth']);
    let jwtPayLoad: any;

    //Verificación del token
    try{
        jwtPayLoad = jwt.verify(token, secretKey.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad;
    } catch (error){
        return res.status(404).json({message: 'No Autorizado'});
    }

    //Obtener datos del payload
    const { cveUsuario, username } = jwtPayLoad;
    //Se crea un nuevo token con expiración de 1 hora
    const newToken = jwt.sign({cveUsuario, username}, secretKey.jwtSecret, {expiresIn: '1h'});
    res.setHeader('token', newToken);
    next();
};