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
        catch(err) {
            throw new Error(`Erro ao buscar vendas ${err.message}`)
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
        catch(err) {
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
        catch(err) {
            throw new Error(`Erro ao deletar venda ${err.message}`)
        }
    }

}

export default new vendaBalcaoModel