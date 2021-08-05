import { Router } from 'express';
import { departamentoController } from '../controllers/departamentoController';

class DepartamentoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
     }

    config(): void {
        this.router.get('/', departamentoController.lista);
        this.router.put('/', departamentoController.insert);
        this.router.post('/', departamentoController.update);
        this.router.delete('/:cveDepartamento', departamentoController.delete);
    }
}

const departamentoRoutes = new DepartamentoRoutes();
export default departamentoRoutes.router;