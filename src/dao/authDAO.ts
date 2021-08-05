import pool from '../database/database';
class AuthDAO {
    public async getUser(username: string){
        const result = await pool.then(async (connection) => {
            return await connection.query("Select * FROM usuario where username = ?", [username]);
        });
        return result;
    }
}

export const dao = new AuthDAO();