import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import indexRoutes from './routes/indexRoutes';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import departamentoRoutes from './routes/departamentoRoutes';

class Server{

    public app:Application; 

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    //Configuracion del servidor
    config(): void{
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    //Rutas para el APIRest
    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/auth', authRoutes);
        this.app.use('/usuario', usuarioRoutes);
        this.app.use('/departamento', departamentoRoutes);
    }

    //Inicialización del servidor
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();