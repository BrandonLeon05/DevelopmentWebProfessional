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

    public async update(departamento: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("UPDATE departamento SET ? WHERE cveDepartamento = ?", [departamento, departamento.cveDepartamento]);
        });
        return result;
    }

    public async delete(cveDepartamento: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("DELETE FROM departamento WHERE cveDepartamento = ?", [cveDepartamento]);
        });
        return result;
        
    }
}

export const dao = new DepartamentoDAO();