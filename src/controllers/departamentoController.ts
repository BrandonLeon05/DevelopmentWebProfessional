import {Request, Response } from 'express';
import { dao } from '../dao/departamentoDAO';

class DepartamentoController {

    public async lista(req: Request, res: Response){
        const result = await dao.lista();

        res.json(result);
    }

    public async insert(req: Request, res: Response) {
        const { descripcion, planta, fechaConstruccion } = req.body;
        if (descripcion == null || planta == null || fechaConstruccion == null) {
            return res.status(400).json({message: 'Debe rellenar todos los campos'});
        }
        //Estatico, saber como obtener de logeo
        let cveEncargado = 1;
        const departamento = {
            descripcion,
            planta,
            fechaConstruccion,
            cveEncargado
        }

        const result = await dao.insert(departamento);
        if(result.affectedRows > 0){
            return res.json({message: 'Datos guardados'});
        }else{
            return res.status(400).json({message: result.message});
        }
    }

}

export const departamentoController = new DepartamentoController();