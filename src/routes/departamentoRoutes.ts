import { Router } from 'express';
import { departamentoController } from '../controllers/departamentoController';

class DepartamentoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
     }

    config(): void {
        this.router.get('/', departamentoController.lista);
    }
}

const departamentoRoutes = new DepartamentoRoutes();
export default departamentoRoutes.router;