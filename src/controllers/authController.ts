import { Request, Response } from 'express';
class AuthController {
    public login(req: Request, res: Response) {
        const { usuario, password } = req.body;
        if (usuario == null || password == null)
            return res.status(400).json({message : "Los datos no pueden ser nulos"});
    }
}

export const authController = new AuthController();