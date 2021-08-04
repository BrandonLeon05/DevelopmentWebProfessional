import {Request, Response } from 'express';
import pool from '../database/database';

class DepartamentoDAO {

    public async lista(){
        const result = await pool.then(async(connection)=>{
            return await connection.query('SELECT cveDepa, descripcion, planta FROM departamento')
        });
        return result;
    }

    public async insert(departamento: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query('INSERT INTO departamento SET ?', [departamento]);
        });
        return result;
    }
}

export const dao = new DepartamentoDAO();