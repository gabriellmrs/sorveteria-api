import { connectToDataBase } from '../db/connection.js'

class fornecedorModel {

    async createFornecedor(nome, telefone) {
        try {
            const conexao = await connectToDataBase()
            const response = conexao.execute(`
                INSERT INTO FORNECEDOR (NOME, TELEFONE) VALUES (?,?)`, [nome, telefone || null])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao criar fornecedor: ${err.message}`)
        }
    }

    async findAll() {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`SELECT * FROM FORNECEDOR`)
            return response
        }
        catch(err) {
            throw new Error(`Erro ao buscar fornecedor: ${err.message}`)
        }
    }

    async findByName(nome) {
        try {
            const conexao = await connectToDataBase()
            const [rows] = await conexao.execute('SELECT * FROM FORNECEDOR WHERE NOME LIKE ?', [`%${nome}%`])
            return rows
        }
        catch (err) {
            throw new Error(`Erro ao buscar fornecedor por nome: ${err.message}`)
        }
    }

    async updateFornecedor(id, nome, telefone) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                UPDATE FORNECEDOR SET NOME = ?, TELEFONE = ? WHERE ID = ?`,
            [nome, telefone || null, id])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao atualizar fornecedor: ${err.message}`)
        }
    }

    async deleteFornecedor(id) {
        try {
            const conexo = await connectToDataBase()
            const response = await conexo.execute(`DELETE FROM FORNECEDOR WHERE ID = ?`, [id])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao deletar fornecedor: ${err.message}`)
        }
    }
}

export default new fornecedorModel()