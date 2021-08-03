import {Request, Response } from 'express';
import { dao } from '../dao/departamentoDAO';

class DepartamentoController {

    public async lista(req: Request, res: Response){
        const result = await dao.lista();

        res.json(result);
    }

}

export const departamentoController = new DepartamentoController();