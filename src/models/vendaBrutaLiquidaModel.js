import { connectToDataBase } from "../db/connection.js";

class VendaBrutaLiquidaModel {
  async calcularTotaisMes(mes, ano) {
    try {
      const conexao =  connectToDataBase();

      // Total carrinho
      const [carrinhoRows] = await conexao.execute(`
        SELECT SUM(spv.total_unidade) AS total_carrinho
        FROM saida_produtos_vendedor spv
        JOIN saida_vendedor sv ON spv.id_saida = sv.id
        WHERE MONTH(sv.data_saida) = ? AND YEAR(sv.data_saida) = ?
      `, [mes, ano]);

      // Total atacado
      const [atacadoRows] = await conexao.execute(`
        SELECT SUM(VALOR_COMPRA) AS total_atacado
        FROM venda_cliente
        WHERE MONTH(DATA_VENDA) = ? AND YEAR(DATA_VENDA) = ?
      `, [mes, ano]);

      // Total balcão
      const [balcaoRows] = await conexao.execute(`
        SELECT SUM(VALOR_VENDA) AS total_balcao
        FROM venda_balcao
        WHERE MONTH(DATA_VENDA) = ? AND YEAR(DATA_VENDA) = ?
      `, [mes, ano]);

      // Total saída de caixa
      const [saidaRows] = await conexao.execute(`
        SELECT SUM(VALOR) AS total_saida
        FROM saida
        WHERE MONTH(DATA_SAIDA) = ? AND YEAR(DATA_SAIDA) = ?
      `, [mes, ano]);

      const totalCarrinho = Number(carrinhoRows[0].total_carrinho) || 0;
      const totalAtacado = Number(atacadoRows[0].total_atacado) || 0;
      const totalBalcao = Number(balcaoRows[0].total_balcao) || 0;
      const totalSaida = Number(saidaRows[0].total_saida) || 0;

      const totalBruto = totalCarrinho + totalAtacado + totalBalcao;
      const totalLiquido = totalBruto - totalSaida;

      return {
        total_carrinho: totalCarrinho,
        total_atacado: totalAtacado,
        total_balcao: totalBalcao,
        total_saida: totalSaida,
        total_bruto: totalBruto,
        total_liquido: totalLiquido
      };
    } catch (err) {
      throw new Error(`Erro ao calcular totais: ${err.message}`);
    }
  }
}

export default new VendaBrutaLiquidaModel();
