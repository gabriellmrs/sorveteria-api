import { connectToDataBase } from "../db/connection.js";

class SaidaVendedorModel {

  // Criar uma nova saída de produtos para o vendedor
  async criarSaida(idVendedor) {
    try {
      const conexao = connectToDataBase();
      const [result] = await conexao.execute(`
                INSERT INTO saida_vendedor (id_vendedor) VALUES (?)
            `, [idVendedor]);
      return result.insertId; // retorna o ID gerado
    } catch (err) {
      throw new Error(`Erro ao registrar saída: ${err.message}`);
    }
  }

  // Inserir produtos levados na saída
  async inserirProdutosSaida(idSaida, produtos) {
    try {
      const conexao = connectToDataBase();

      for (const p of produtos) {
        await conexao.execute(`
        INSERT INTO saida_produtos_vendedor (id_saida, produto, quantidade_saida, quantidade_retorno, valor_unidade)
        VALUES (?, ?, ?, ?, ?)
      `, [idSaida, p.produto, p.quantidade_saida, p.quantidade_retorno || 0, p.valor_unidade]);
      }

      return { mensagem: 'Produtos inseridos com sucesso' };
    } catch (err) {
      throw new Error(`Erro ao inserir produtos da saída: ${err.message}`);
    }
  }



  // Atualizar quantidade de retorno por nome do vendedor, produto e data atual
  async atualizarRetornoPorNomeEProduto(nomeVendedor, produto, quantidadeRetorno) {
    try {
      const conexao = connectToDataBase();
      const [result] = await conexao.execute(`
      UPDATE saida_produtos_vendedor spv
      JOIN saida_vendedor sv ON spv.id_saida = sv.id
      JOIN vendedor v ON sv.id_vendedor = v.id
      SET spv.quantidade_retorno = ?
      WHERE v.nome = ?
        AND spv.produto = ?
        AND DATE(sv.data_saida) = CURDATE();
    `, [quantidadeRetorno, nomeVendedor, produto]);

      return { mensagem: 'Quantidade de retorno atualizada com sucesso', linhasAfetadas: result.affectedRows };
    } catch (err) {
      throw new Error(`Erro ao atualizar retorno por nome e produto: ${err.message}`);
    }
  }

  // Consultar saída detalhada por ID
  async consultarSaidaDetalhada(idSaida) {
    try {
      const conexao = connectToDataBase();
      const [rows] = await conexao.execute(`
                SELECT 
                    v.nome AS vendedor,
                    sv.data_saida,
                    spv.produto,
                    spv.quantidade_saida,
                    spv.quantidade_retorno,
                    spv.quantidade_vendida,
                    spv.valor_unidade,
                    spv.total_unidade
                FROM saida_produtos_vendedor spv
                JOIN saida_vendedor sv ON spv.id_saida = sv.id
                JOIN vendedor v ON sv.id_vendedor = v.id
                WHERE sv.id = ?;
            `, [idSaida]);
      return rows;
    } catch (err) {
      throw new Error(`Erro ao consultar saída detalhada: ${err.message}`);
    }
  }

  // Calcular o total a pagar por saída
  async calcularTotalAPagar(idSaida) {
    try {
      const conexao = connectToDataBase();
      const [rows] = await conexao.execute(`
                SELECT 
                    SUM(total_unidade) AS total_a_pagar
                FROM saida_produtos_vendedor
                WHERE id_saida = ?;
            `, [idSaida]);
      return rows[0];
    } catch (err) {
      throw new Error(`Erro ao calcular total a pagar: ${err.message}`);
    }
  }

  // Deletar uma saída (e seus produtos)
  async deletarSaida(idSaida) {
    try {
      const conexao = connectToDataBase();
      await conexao.execute(`
                DELETE FROM saida_produtos_vendedor WHERE id_saida = ?
            `, [idSaida]);
      await conexao.execute(`
                DELETE FROM saida_vendedor WHERE id = ?
            `, [idSaida]);
      return { mensagem: "Saída excluída com sucesso." };
    } catch (err) {
      throw new Error(`Erro ao deletar saída: ${err.message}`);
    }
  }

  // Consultar produtos do vendedor em saídas do dia atual
  async consultarProdutosDoDiaPorVendedor(nomeVendedor) {
    try {
      const conexao = connectToDataBase();
      const [rows] = await conexao.execute(`
      SELECT 
        spv.produto,
        spv.quantidade_saida,
        spv.quantidade_retorno,
        spv.quantidade_vendida,
        spv.valor_unidade,
        spv.total_unidade
      FROM saida_produtos_vendedor spv
      JOIN saida_vendedor sv ON spv.id_saida = sv.id
      JOIN vendedor v ON sv.id_vendedor = v.id
      WHERE v.nome = ?
        AND DATE(sv.data_saida) = CURDATE()
    `, [nomeVendedor]);
      return rows;
    } catch (err) {
      throw new Error(`Erro ao consultar produtos do vendedor no dia: ${err.message}`);
    }
  }

  // Calcular total do dia por nome do vendedor
  async calcularTotalDoDiaPorVendedor(nomeVendedor) {
    try {
      const conexao = connectToDataBase();
      const [rows] = await conexao.execute(`
      SELECT 
          SUM(spv.total_unidade) AS total_a_pagar
      FROM saida_produtos_vendedor spv
      JOIN saida_vendedor sv ON spv.id_saida = sv.id
      JOIN vendedor v ON sv.id_vendedor = v.id
      WHERE v.nome = ? 
        AND DATE(sv.data_saida) = CURDATE()
    `, [nomeVendedor]);

      return rows[0];
    } catch (err) {
      throw new Error(`Erro ao calcular total do dia para vendedor: ${err.message}`);
    }
  }

  // Model - adicionar método para inserir produto com nome do vendedor e data atual
  async inserirProdutoPorNome(produto, quantidade_saida, quantidade_retorno, valor_unidade, nomeVendedor) {
    try {
      const conexao = connectToDataBase();
      const [result] = await conexao.execute(`
      INSERT INTO saida_produtos_vendedor (
        id_saida,
        produto,
        quantidade_saida,
        quantidade_retorno,
        valor_unidade
      )
      SELECT
        sv.id,
        ?, ?, ?, ?
      FROM saida_vendedor sv
      JOIN vendedor v ON sv.id_vendedor = v.id
      WHERE v.nome = ?
        AND DATE(sv.data_saida) = CURDATE();
    `, [produto, quantidade_saida, quantidade_retorno || 0, valor_unidade, nomeVendedor]);

      return { mensagem: 'Produto inserido com sucesso', linhasAfetadas: result.affectedRows };
    } catch (err) {
      throw new Error(`Erro ao inserir produto por nome do vendedor: ${err.message}`);
    }
  }

  // Verificar se já existe uma saída hoje para o vendedor
  async verificarSaidaHojePorNome(nomeVendedor) {
    try {
      const conexao = connectToDataBase();
      const [rows] = await conexao.execute(`
      SELECT sv.id AS idSaida
      FROM saida_vendedor sv
      JOIN vendedor v ON sv.id_vendedor = v.id
      WHERE v.nome = ?
        AND DATE(sv.data_saida) = CURDATE()
      LIMIT 1
    `, [nomeVendedor]);

      if (rows.length === 0) {
        return null; // Nenhuma saída hoje
      }

      return rows[0]; // Retorna { idSaida: ... }
    } catch (err) {
      throw new Error(`Erro ao verificar saída do dia: ${err.message}`);
    }
  }

  // Calcular total do mês por nome do vendedor
  async calcularTotalMesPorVendedor(nomeVendedor) {
    try {
      const conexao = connectToDataBase();
      const [rows] = await conexao.execute(`
      SELECT 
        SUM(spv.total_unidade) AS total_mes
      FROM saida_produtos_vendedor spv
      JOIN saida_vendedor sv ON spv.id_saida = sv.id
      JOIN vendedor v ON sv.id_vendedor = v.id
      WHERE v.nome = ?
        AND MONTH(sv.data_saida) = MONTH(CURDATE())
        AND YEAR(sv.data_saida) = YEAR(CURDATE())
    `, [nomeVendedor]);

      return rows[0];
    } catch (err) {
      throw new Error(`Erro ao calcular total do mês para vendedor: ${err.message}`);
    }
  }

  // Calcular total do mês para todos os vendedores
  async calcularTotalMesTodosVendedores() {
    try {
      const conexao = connectToDataBase();
      const [rows] = await conexao.execute(`
      SELECT 
        SUM(spv.total_unidade) AS total_geral_mes
      FROM saida_produtos_vendedor spv
      JOIN saida_vendedor sv ON spv.id_saida = sv.id
      WHERE MONTH(sv.data_saida) = MONTH(CURDATE())
        AND YEAR(sv.data_saida) = YEAR(CURDATE())
    `);
      return rows[0];
    } catch (err) {
      throw new Error(`Erro ao calcular total do mês de todos os vendedores: ${err.message}`);
    }
  }

    // Atualizar quantidade de saída de um produto
  async atualizarQuantidadeProduto(idSaida, produto, novaQuantidade) {
    try {
      const conexao = connectToDataBase();
      const [result] = await conexao.execute(`
        UPDATE saida_produtos_vendedor
        SET quantidade_saida = ?
        WHERE id_saida = ? AND produto = ?
      `, [novaQuantidade, idSaida, produto]);

      return { mensagem: 'Quantidade atualizada com sucesso', linhasAfetadas: result.affectedRows };
    } catch (err) {
      throw new Error(`Erro ao atualizar quantidade do produto: ${err.message}`);
    }
  }

  // Remover um produto da saída
  async removerProduto(idSaida, produto) {
    try {
      const conexao = connectToDataBase();
      const [result] = await conexao.execute(`
        DELETE FROM saida_produtos_vendedor
        WHERE id_saida = ? AND produto = ?
      `, [idSaida, produto]);

      return { mensagem: 'Produto removido com sucesso', linhasAfetadas: result.affectedRows };
    } catch (err) {
      throw new Error(`Erro ao remover produto: ${err.message}`);
    }
  }



}

export default new SaidaVendedorModel();
