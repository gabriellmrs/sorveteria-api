import { connectToDataBase } from "../db/connection.js";

class saidaCaixaModel {
    async createSaida(nome, descricao, valor) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                INSERT INTO SAIDA (NOME, DESCRICAO, VALOR)
                VALUES (?, ?, ?)`, [nome, descricao, valor])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao cadastrar saida ${err.message}`)
        }
    }

    async findAll() {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
                SELECT * FROM SAIDA`)
            return response
        }
        catch(err) {
            throw new Error(`Erro ao consultar saida ${err.message} `)
        }
    }

    //BUSCA VENDA COM FILTRO
    async findByFilter(filtros) {
        try {
            const conexao = await connectToDataBase();
    
            let sql = "SELECT * FROM SAIDA WHERE 1=1";
            const params = [];
    
            if (typeof filtros.ano === 'number') {
                sql += " AND YEAR(DATA_SAIDA) = ?";
                params.push(filtros.ano);
            }
    
            if (typeof filtros.mes === 'number') {
                sql += " AND MONTH(DATA_SAIDA) = ?";
                params.push(filtros.mes);
            }
    
            if (typeof filtros.dia === 'number') {
                sql += " AND DAY(DATA_SAIDA) = ?";
                params.push(filtros.dia);
            }
    
            if (typeof filtros.valor === 'number') {
                sql += " AND VALOR = ?";
                params.push(filtros.valor);
            }
    
            if (filtros.descricao && filtros.descricao.trim() !== '') {
                sql += " AND DESCRICAO = ?";
                params.push(filtros.descricao.trim());
            }

            if (filtros.nome && filtros.nome.trim() !== '') {
                sql += " AND NOME = ?";
                params.push(filtros.nome.trim());
            }
    
            const [rows] = await conexao.execute(sql, params);
            return rows;
        } catch (err) {
            throw new Error(`Erro ao buscar saida: ${err.message}`);
        }
    }   
    
    async deleteSaida(id) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`DELETE FROM SAIDA WHERE ID = ?`, [id])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao remover saida ${err.message}`)
        }
    }

    async updateSaida(id, nome, valor, descricao) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                UPDATE SAIDA SET NOME = ?, VALOR = ?, DESCRICAO = ? WHERE ID = ?`,
                [nome, valor, descricao, id])
            return response
        }
        catch(err) {
            throw new Error(`Erro ao editar saida ${err.message}`)
        }
    }
}

export default new saidaCaixaModel