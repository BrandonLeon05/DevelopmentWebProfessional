import {Request, Response } from 'express';
import { dao } from '../dao/departamentoDAO';

class DepartamentoController {

    public async lista(req: Request, res: Response){
        const result = await dao.lista();

        res.json(result);
    }

    public async insert(req: Request, res: Response) {
        const { descripcion, planta, fechaConstruccion, cveEncargado } = req.body;
        if (descripcion == null || planta == null || fechaConstruccion == null) {
            return res.status(400).json({message: 'Debe rellenar todos los campos'});
        }
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

    //Update departamento
    public async update(req: Request, res: Response) {
        try {
            const departamento = req.body;

            if(departamento.cveDepa == null){
                return res.status(400).json({message : "No se puede actualizar"});
            }

            const result = await dao.update(departamento);
            if(result.affectedRows > 0){
                res.json({message : "El departamento se ha actualizado de manera correcta."});
            }else{
                res.status(400).json({message : result.message});
            }
        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

    //Deleta Departamento
    public async delete(req: Request, res: Response) {
        try {
            const { cveDepa } = req.params;

            if(cveDepa == null){
                return res.status(400).json({ message: "No se pude eliminar" });
            }

            const result = await dao.delete(cveDepa);
            if (result.affectedRows > 0) {
                return res.json({ message: "Departamento eliminado" });
            } else {
                return res.status(400).json({ message: result.message });
            }

        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

}

export const departamentoController = new DepartamentoController();