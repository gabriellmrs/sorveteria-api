import { connectToDataBase } from "../db/connection.js"

class VendedorModel {
    async createVendedor(nome, bairro, rua, numero_casa, telefone) {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
                INSERT INTO VENDEDOR (NOME, BAIRRO, RUA, NUMERO_CASA, TELEFONE)
                VALUES (?, ?, ?, ?, ?)
            `, [nome, bairro, rua, numero_casa, telefone])
            return response
        } catch (err) {
            throw new Error(`Erro ao criar vendedor: ${err.message}`)
        }
    }

    async findAll() {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
                SELECT * FROM VENDEDOR
                ORDER BY NOME ASC
            `)
            return response
        } catch (err) {
            throw new Error(`Erro ao buscar vendedores: ${err.message}`)
        }
    }

    async findById(nome) {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
                SELECT * FROM VENDEDOR WHERE NOME LIKE ?
            `, [nome])
            return response[0]
        } catch (err) {
            throw new Error(`Erro ao buscar vendedor por nome: ${err.message}`)
        }
    }

    async updateVendedor(id, nome, bairro, rua, numero_casa, telefone) {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
                UPDATE VENDEDOR 
                SET NOME = ?, BAIRRO = ?, RUA = ?, NUMERO_CASA = ?, TELEFONE = ?
                WHERE ID = ?
            `, [nome, bairro, rua, numero_casa, telefone, id])
            return response
        } catch (err) {
            throw new Error(`Erro ao atualizar vendedor: ${err.message}`)
        }
    }

    async deleteVendedor(id) {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
                DELETE FROM VENDEDOR WHERE ID = ?
            `, [id])
            return response
        } catch (err) {
            throw new Error(`Erro ao deletar vendedor: ${err.message}`)
        }
    }
}

export default new VendedorModel()
