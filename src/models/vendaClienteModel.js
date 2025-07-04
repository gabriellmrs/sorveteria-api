import { connectToDataBase } from "../db/connection.js"

class vendaClienteModel {

    async createVendaPorNomeCliente(nomeCliente, valorCompra) {
        try {
            const conexao = await connectToDataBase()

            // Buscar o ID do cliente pelo nome
            const [clientes] = await conexao.execute(`
                SELECT ID FROM cliente WHERE NOME = ?
            `, [nomeCliente])

            if (clientes.length === 0) {
                throw new Error("Cliente não encontrado")
            }

            const clienteId = clientes[0].ID

            //Inserir a venda com o ID encontrado
            const [response] = await conexao.execute(`
                INSERT INTO venda_cliente (CLIENTE_ID, VALOR_COMPRA)
                VALUES (?, ?)`,
                [clienteId, valorCompra]
            )

            return response
        } catch (err) {
            throw new Error(`Erro ao criar venda: ${err.message}`)
        }
    }

    async findAll() {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
                SELECT v.ID, v.VALOR_COMPRA, v.DATA_VENDA, c.NOME AS CLIENTE_NOME
                FROM venda_cliente v
                JOIN cliente c ON v.CLIENTE_ID = c.ID
                ORDER BY v.DATA_VENDA DESC
            `)
            return response
        } catch (err) {
            throw new Error(`Erro ao buscar vendas: ${err.message}`)
        }
    }

    async findVendasDoDia() {
        try {
            const conexao = await connectToDataBase()
            const [response] = await conexao.execute(`
            SELECT 
                v.ID, 
                v.VALOR_COMPRA, 
                v.DATA_VENDA, 
                c.NOME AS CLIENTE_NOME, 
                c.CIDADE, 
                c.BAIRRO
            FROM venda_cliente v
                JOIN cliente c ON v.CLIENTE_ID = c.ID
                WHERE DATE(v.DATA_VENDA) = CURDATE()
                ORDER BY v.DATA_VENDA DESC
        `)
            return response
        } catch (err) {
            throw new Error(`Erro ao buscar vendas do dia: ${err.message}`)
        }
    }

    //filtros de pesquisa
    async findByFilter(filtros) {
        try {
            const conexao = await connectToDataBase()

            let sql = `
            SELECT 
                vc.ID,
                vc.CLIENTE_ID,
                c.NOME,
                c.CIDADE,
                c.BAIRRO,
                vc.VALOR_COMPRA,
                vc.DATA_VENDA
            FROM 
                venda_cliente vc
            JOIN 
                cliente c ON vc.CLIENTE_ID = c.ID
            WHERE 1 = 1
        `
            const params = []

            if (typeof filtros.ano === 'number') {
                sql += " AND YEAR(vc.DATA_VENDA) = ?"
                params.push(filtros.ano)
            }

            if (typeof filtros.mes === 'number') {
                sql += " AND MONTH(vc.DATA_VENDA) = ?"
                params.push(filtros.mes)
            }

            if (typeof filtros.dia === 'number') {
                sql += " AND DAY(vc.DATA_VENDA) = ?"
                params.push(filtros.dia)
            }

            if (typeof filtros.valor_compra === 'number') {
                sql += " AND vc.VALOR_COMPRA = ?"
                params.push(filtros.valor_compra)
            }

            if (filtros.nome && filtros.nome.trim() !== '') {
                sql += " AND c.NOME LIKE ?"
                params.push(`%${filtros.nome.trim()}%`)
            }

            if (filtros.cidade && filtros.cidade.trim() !== '') {
                sql += " AND c.CIDADE LIKE ?"
                params.push(`%${filtros.cidade.trim()}%`)
            }

            if (filtros.bairro && filtros.bairro.trim() !== '') {
                sql += " AND c.BAIRRO LIKE ?"
                params.push(`%${filtros.bairro.trim()}%`)
            }

            const [rows] = await conexao.execute(sql, params)
            return rows
        } catch (err) {
            throw new Error(`Erro ao buscar venda com filtros: ${err.message}`)
        }
    }

    async updateVenda(id, valorCompra) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                UPDATE venda_cliente SET  VALOR_COMPRA = ?
                WHERE ID = ?`,
                [valorCompra, id]
            )
            return response
        } catch (err) {
            throw new Error(`Erro ao atualizar venda: ${err.message}`)
        }
    }

    async deleteVenda(id) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                DELETE FROM venda_cliente WHERE ID = ?`,
                [id]
            )
            return response
        } catch (err) {
            throw new Error(`Erro ao deletar venda: ${err.message}`)
        }
    }

    // Total do mês atual para um cliente específico
    async getTotalMesPorNomeCliente(nomeCliente) {
        try {
            const conexao = await connectToDataBase();
            const [rows] = await conexao.execute(`
      SELECT 
        c.NOME AS cliente,
        SUM(v.VALOR_COMPRA) AS total_mes
      FROM venda_cliente v
      JOIN cliente c ON v.CLIENTE_ID = c.ID
      WHERE c.NOME = ?
        AND MONTH(v.DATA_VENDA) = MONTH(CURDATE())
        AND YEAR(v.DATA_VENDA) = YEAR(CURDATE())
      GROUP BY c.NOME
    `, [nomeCliente]);

            return rows[0]; // pode ser undefined se não houver resultados
        } catch (err) {
            throw new Error(`Erro ao calcular total do mês para o cliente: ${err.message}`);
        }
    }

    // Total geral do mês (todos os clientes)
    async getTotalMesGeral() {
        try {
            const conexao = await connectToDataBase();
            const [rows] = await conexao.execute(`
      SELECT 
        SUM(VALOR_COMPRA) AS total_geral_mes
      FROM venda_cliente
      WHERE MONTH(DATA_VENDA) = MONTH(CURDATE())
        AND YEAR(DATA_VENDA) = YEAR(CURDATE())
    `);
            return rows[0];
        } catch (err) {
            throw new Error(`Erro ao calcular total geral do mês: ${err.message}`);
        }
    }

}

export default new vendaClienteModel()
