import {Request, Response } from 'express';
import pool from '../database/database';

class DepartamentoDAO {

    public async lista(){
        const result = await pool.then(async(connection)=>{
            return await connection.query('SELECT * FROM departamento')
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
            return await connection.query("UPDATE departamento SET ? WHERE cveDepa = ?", [departamento, departamento.cveDepa]);
        });
        return result;
    }

    public async delete(cveDepa: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("DELETE FROM departamento WHERE cveDepa = ?", [cveDepa]);
        });
        return result;
        
    }
}

export const dao = new DepartamentoDAO();