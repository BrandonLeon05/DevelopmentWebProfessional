import indexRoutes from "../routes/indexRoutes";
import { Request, Response } from 'express';
import pool from '../database/database';

class IndexController{

    public async lista(req: Request, res: Response): Promise<void> {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT * FROM departamento');
        });
        res.json(result);
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