import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController';

class UsuarioRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
     }

    config(): void {
        this.router.get('/', usuarioController.lista);
        this.router.put('/', usuarioController.insert);
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;