import indexRoutes from "../routes/indexRoutes";
import { Request, Response } from 'express';

class IndexController{

    lista(req: Request, res: Response): void{
        res.json({message: 'Get Index'});
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