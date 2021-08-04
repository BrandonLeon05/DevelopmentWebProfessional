import {Request, Response } from 'express';
import { dao } from '../dao/departamentoDAO';

class DepartamentoController {

    public async lista(req: Request, res: Response){
        const result = await dao.lista();

        res.json(result);
    }

    public async insert(req: Request, res: Response) {
        const { descripcion, planta, fecha_construccion } = req.body;
        if (descripcion == null || planta == null || fecha_construccion == null) {
            return res.status(400).json({message: 'Debe rellenar todos los campos'});
        }
        //Estatico, saber como obtener de logeo
        let cveEncargado = 1;
        const departamento = {
            descripcion,
            planta,
            fecha_construccion,
            cveEncargado
        }

        const result = await dao.insert(departamento);
        if(result.affectedRows > 0){
            return res.json({message: 'Datos guardados'});
        }else{
            return res.status(400).json({message: result.message});
        }
        res.json(result);
    }

}

export const departamentoController = new DepartamentoController();