import pool from '../database/database';

class UsuarioDAO {

    public async lista(){
        const result = await pool.then(async(connection)=>{
            return await connection.query('SELECT cveUsuario, nombre FROM usuario')
        });
        return result;
    }

    
    public async insert(user: any){
        const result = await pool.then(async(connection)=>{
            return await connection.query('INSERT INTO Usuario SET ?',[user]);
        });

        return result;
    }

}

export const dao = new UsuarioDAO();