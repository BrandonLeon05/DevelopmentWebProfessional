import pool from '../database/database';

class DepartamentoDAO {

    public async lista(){
        const result = await pool.then(async(connection)=>{
            return await connection.query('SELECT cveDepa, descripcion, planta FROM departamento')
        });
        return result;
    }
}

export const dao = new DepartamentoDAO();