import pool from '../database/database';
class AuthDAO {
    public async getUsuer(usuario: string){
        const result = await pool.then(async (connection) => {
            return await connection.query("Select * FROM usuario where usuario = ?", [usuario]);
        });
        return result;
    }
}

export const dao = new AuthDAO();