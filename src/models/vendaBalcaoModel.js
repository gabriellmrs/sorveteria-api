import { connectToDataBase } from "../db/connection.js";

class vendaBalcaoModel {

    async createVenda(valorVenda, formaDePagamento, valorPago) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                INSERT INTO VENDA_BALCAO (VALOR_VENDA, FORMA_PAGAMENTO, VALOR_PAGO) VALUES (?,?,?)`,
                [valorVenda, formaDePagamento, valorPago])
            return response
        }
        catch (err) {
            throw new Error(`Erro ao registrar venda ${err.message}`)
        }
    }
    //BUSCA POR VENDA DO DIA
    async find() {
        try {
            const conexao = await connectToDataBase()
            const [rows] = await conexao.execute(`
                SELECT * FROM VENDA_BALCAO WHERE DATE(DATA_VENDA) = CURDATE()`)
            return rows
        }
        catch (err) {
            throw new Error(`Erro ao buscar vendas ${err.message}`)
        }
    }

    //BUSCA VENDA COM FILTRO
    async findByFilter(filtros) {
        try {
            const conexao = await connectToDataBase();

            let sql = "SELECT * FROM VENDA_BALCAO WHERE 1=1";
            const params = [];

            if (typeof filtros.ano === 'number') {
                sql += " AND YEAR(DATA_VENDA) = ?";
                params.push(filtros.ano);
            }

            if (typeof filtros.mes === 'number') {
                sql += " AND MONTH(DATA_VENDA) = ?";
                params.push(filtros.mes);
            }

            if (typeof filtros.dia === 'number') {
                sql += " AND DAY(DATA_VENDA) = ?";
                params.push(filtros.dia);
            }

            if (typeof filtros.valorVenda === 'number') {
                sql += " AND VALOR_VENDA = ?";
                params.push(filtros.valorVenda);
            }

            if (filtros.formaDePagamento && filtros.formaDePagamento.trim() !== '') {
                sql += " AND FORMA_PAGAMENTO = ?";
                params.push(filtros.formaDePagamento.trim());
            }

            const [rows] = await conexao.execute(sql, params);
            return rows;
        } catch (err) {
            throw new Error(`Erro ao buscar vendas: ${err.message}`);
        }
    }



    async updateVenda(id, valorVenda, formaDePagamento, valorPago) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                UPDATE VENDA_BALCAO SET VALOR_VENDA = ?, FORMA_PAGAMENTO = ?, VALOR_PAGO = ? WHERE ID = ?`,
                [valorVenda, formaDePagamento, valorPago, id])
            return response
        }
        catch (err) {
            throw new Error(`Não foi possivel alterar a venda ${err.message}`)
        }
    }

    async deleteVenda(id) {
        try {
            const conexao = await connectToDataBase()
            const response = await conexao.execute(`
                DELETE FROM VENDA_BALCAO WHERE ID = ?`, [id])
            return response
        }
        catch (err) {
            throw new Error(`Erro ao deletar venda ${err.message}`)
        }
    }

    // Total de vendas de balcão no mês atual
    async getTotalMesBalcao() {
        try {
            const conexao = await connectToDataBase();
            const [rows] = await conexao.execute(`
      SELECT 
        SUM(VALOR_VENDA) AS total_mes
      FROM VENDA_BALCAO
      WHERE MONTH(DATA_VENDA) = MONTH(CURDATE())
        AND YEAR(DATA_VENDA) = YEAR(CURDATE())
    `);
            return rows[0];
        } catch (err) {
            throw new Error(`Erro ao calcular total do mês das vendas de balcão: ${err.message}`);
        }
    }


}

export default new vendaBalcaoModel