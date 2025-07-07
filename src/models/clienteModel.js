import { connectToDataBase } from '../db/connection.js'

class clienteModel {

    async findAll() {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute('SELECT * FROM cliente')
            return response
        }
        catch (err) {
            throw new Error(`Erro ao buscar clientes: ${err.message}`)
        }
    }

    async findByID(nome) {
        try {
            const conexao = await connectToDataBase()
            const [rows] = await conexao.execute('SELECT * FROM cliente WHERE NOME LIKE ?', [`%${nome}%`])
            return rows
        }
        catch (err) {
            throw new Error(`Erro ao buscar clientes por nome: ${err.message}`)
        }
    }

    async findByCity(cidade) {
        try {
          const conexao = await connectToDataBase();
          const [rows] = await conexao.execute('SELECT * FROM cliente WHERE CIDADE LIKE ?', [`%${cidade}%`]);
          return rows;
        } catch (err) {
          throw new Error(`Erro ao buscar clientes por cidade: ${err.message}`);
        }
      }

      async findByBairro(bairro) {
        try {
          const conexao = await connectToDataBase();
          const [rows] = await conexao.execute('SELECT * FROM cliente WHERE BAIRRO LIKE ?', [`%${bairro}%`]);
          return rows;
        } catch (err) {
          throw new Error(`Erro ao buscar clientes por bairro: ${err.message}`);
        }
      }

    async createCliente(nome, estado, cidade, bairro, endereco, telefone, cnpj_cpf) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                INSERT INTO cliente (NOME, ESTADO, CIDADE, BAIRRO, ENDERECO, TELEFONE, CNPJ_CPF)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    nome,
                    estado || null,
                    cidade || null,
                    bairro || null,
                    endereco || null,
                    telefone || null,
                    cnpj_cpf || null
                ])
            return response
        }
        catch (err) {
            throw new Error(`Erro ao criar cliente: ${err.message}`)
        }
    }

    async updateCliente(id, nome, estado, cidade, bairro, endereco, telefone, cnpj_cpf) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                UPDATE cliente
                SET NOME = ?, ESTADO = ?, CIDADE = ?, BAIRRO = ?, ENDERECO = ?, TELEFONE = ?, CNPJ_CPF = ?
                WHERE ID = ?`,
                [
                    nome,
                    estado || null,
                    cidade || null,
                    bairro || null,
                    endereco || null,
                    telefone || null,
                    cnpj_cpf || null,
                    id
                ])
            return response
        }
        catch (err) {
            throw new Error(`Erro ao atualizar cliente: ${err.message}`)
        }
    }

    async deleteCliente(id) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute('DELETE FROM cliente WHERE ID = ?', [id])
            return response
        }
        catch (err) {
            throw new Error(`Erro ao deletar cliente: ${err.message}`)
        }
    }
}

export default new clienteModel()
