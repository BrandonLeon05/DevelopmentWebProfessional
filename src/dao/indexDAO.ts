import pool from '../database/database';

class indexDAO {

    public async test() {
        const result = await pool.then(async (connection) => {
            return await connection.query("SELECT * FROM departamento");
        });

        return result;
    }

}

export const dao = new indexDAO();