import indexRoutes from "../routes/indexRoutes";
import { Request, Response } from 'express';
import { dao } from '../dao/indexDAO';

class IndexController{

    public async lista(req: Request, res: Response): Promise<void> {
        //const result = await dao.test();
        res.json('API WORKS');
    };

    insertar(req: Request, res: Response): void {
        res.json({message: "INSERT DEPARTAMENTOS"});
    }

    actualizar(req: Request, res: Response): void {
        res.json({message: "UPDATE DEPARTAMENTOS"});
    }

    eliminar(req: Request, res: Response): void {
        res.json({message: "DELETE DEPARTAMENTOS"});
    }
}

export const indexController = new IndexController();