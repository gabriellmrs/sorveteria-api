import { connectToDataBase } from '../db/connection.js'

class clienteModel {

    async findAll() {
        try {
            const pool = connectToDataBase()
            const [rows] = await pool.execute('SELECT * FROM cliente')
            return rows
        } catch (err) {
            throw new Error(`Erro ao buscar clientes: ${err.message}`)
        }
    }

    async findByID(nome) {
        try {
            const pool = connectToDataBase()
            const [rows] = await pool.execute(
                'SELECT * FROM cliente WHERE NOME LIKE ?', 
                [`%${nome}%`]
            )
            return rows
        } catch (err) {
            throw new Error(`Erro ao buscar clientes por nome: ${err.message}`)
        }
    }

    async findByCity(cidade) {
        try {
            const pool = connectToDataBase()
            const [rows] = await pool.execute(
                'SELECT * FROM cliente WHERE CIDADE LIKE ?',
                [`%${cidade}%`]
            )
            return rows
        } catch (err) {
            throw new Error(`Erro ao buscar clientes por cidade: ${err.message}`)
        }
    }

    async findByBairro(bairro) {
        try {
            const pool = connectToDataBase()
            const [rows] = await pool.execute(
                'SELECT * FROM cliente WHERE BAIRRO LIKE ?',
                [`%${bairro}%`]
            )
            return rows
        } catch (err) {
            throw new Error(`Erro ao buscar clientes por bairro: ${err.message}`)
        }
    }

    async createCliente(...args) {
        try {
            const pool = connectToDataBase()
            const sql = `
                INSERT INTO cliente 
                (NOME, ESTADO, CIDADE, BAIRRO, ENDERECO, TELEFONE, CNPJ_CPF)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `
            const response = await pool.execute(sql, args)
            return response
        } catch (err) {
            throw new Error(`Erro ao criar cliente: ${err.message}`)
        }
    }

    async updateCliente(id, ...rest) {
        try {
            const pool = connectToDataBase()
            const sql = `
                UPDATE cliente SET 
                NOME = ?, ESTADO = ?, CIDADE = ?, BAIRRO = ?, 
                ENDERECO = ?, TELEFONE = ?, CNPJ_CPF = ?
                WHERE ID = ?
            `
            const response = await pool.execute(sql, [...rest, id])
            return response
        } catch (err) {
            throw new Error(`Erro ao atualizar cliente: ${err.message}`)
        }
    }

    async deleteCliente(id) {
        try {
            const pool = connectToDataBase()
            const response = await pool.execute(
                'DELETE FROM cliente WHERE ID = ?', 
                [id]
            )
            return response
        } catch (err) {
            throw new Error(`Erro ao deletar cliente: ${err.message}`)
        }
    }
}

export default new clienteModel()
