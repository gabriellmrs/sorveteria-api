import { connectToDataBase } from "../db/connection.js";

class produtoModel {

    async createProduto(nome, valor) {
        try {
            const conexao = connectToDataBase()
            const response = await conexao.execute(`
            INSERT INTO produto (NOME, VALOR) VALUES (?,?)`, [nome, valor])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao criar produto ${err.message}`)
        }
    }

    async findAll() {
        try {
            const conexao = connectToDataBase()
            const [response] = await conexao.execute(`SELECT * FROM produto`)
            return response
        }
        catch(err) {
            throw new Error(`Não foi possivel buscar produto ${err.message}`)
        }
    }

    async findByName(nome) {
        try {
            const conexao = connectToDataBase()
            const [response] = await conexao.execute(`
                SELECT * FROM produto WHERE NOME LIKE ?`,
                [`%${nome}%`])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao encontrar produto ${err.message}`)
        }   
    }

    async updateProduto(id, nome, valor) {
        try {
            const conexao = connectToDataBase()
            const response = await conexao.execute(`
                UPDATE produto SET NOME = ?, VALOR = ? WHERE ID = ?`,
                [nome, valor, id])
            return response
        }
        catch(err) {
            throw new Error(`Não foi possivel atualizar o produto ${err.message}`)
        }
    }

    async deleteProduto(id) {
        try {
            const conexao = connectToDataBase()
            const response = await conexao.execute(`
                DELETE FROM produto WHERE ID = ?`,
                [id])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao deletar produto ${err.message}`)
        }       
    }
}

export default new produtoModel()