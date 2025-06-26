import SaidaVendedorModel from "../models/saidaVendedorModel.js";
import vendedorModel from "../models/vendedorModel.js"

class SaidaVendedorController {

  async criarSaida(req, res) {
    try {
      const { nomeVendedor } = req.params;

      const listaVendedor = await vendedorModel.findAll();

      const vendedor = listaVendedor.find(u => u.NOME && u.NOME.toLowerCase() === nomeVendedor.toLowerCase());

      if (!vendedor) {
        return res.status(404).json({ erro: "Vendedor não encontrado" });
      }

      // Aqui deve ser ID maiúsculo:
      const idSaida = await SaidaVendedorModel.criarSaida(vendedor.ID);

      res.status(201).json({ idSaida, mensagem: "Saída criada com sucesso." });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }





  async inserirProdutos(req, res) {
    try {
      const { idSaida } = req.params;
      const produto = req.body; // array de { produto, quantidade_saida }
      const resultado = await SaidaVendedorModel.inserirProdutosSaida(idSaida, [produto]);
      res.status(200).json(resultado);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async atualizarRetornoPorNomeEProduto(req, res) {
    try {
      const { nomeVendedor } = req.params;
      const { produto, quantidadeRetorno } = req.body;

      const resultado = await SaidaVendedorModel.atualizarRetornoPorNomeEProduto(
        nomeVendedor,
        produto,
        quantidadeRetorno
      );

      res.status(200).json(resultado);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }


  async consultarSaida(req, res) {
    try {
      const { idSaida } = req.params;
      const detalhes = await SaidaVendedorModel.consultarSaidaDetalhada(idSaida);
      res.status(200).json(detalhes);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async calcularTotal(req, res) {
    try {
      const { idSaida } = req.params;
      const total = await SaidaVendedorModel.calcularTotalAPagar(idSaida);
      res.status(200).json(total);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async deletarSaida(req, res) {
    try {
      const { idSaida } = req.params;
      const resultado = await SaidaVendedorModel.deletarSaida(idSaida);
      res.status(200).json(resultado);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async consultarProdutosHojePorVendedor(req, res) {
    try {
      const { nomeVendedor } = req.params;
      const produtos = await SaidaVendedorModel.consultarProdutosDoDiaPorVendedor(nomeVendedor);

      if (produtos.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum produto encontrado para hoje." });
      }

      res.status(200).json(produtos);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async calcularTotalHojePorVendedor(req, res) {
    try {
      const { nomeVendedor } = req.params;
      const total = await SaidaVendedorModel.calcularTotalDoDiaPorVendedor(nomeVendedor);

      if (!total || total.total_a_pagar === null) {
        return res.status(404).json({ mensagem: "Nenhuma venda registrada hoje para este vendedor." });
      }

      res.status(200).json(total);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async inserirProdutoPorNome(req, res) {
    try {
      const { nomeVendedor } = req.params;
      const { produto, quantidade_saida, quantidade_retorno, valor_unidade } = req.body;

      const resultado = await SaidaVendedorModel.inserirProdutoPorNome(
        produto,
        quantidade_saida,
        quantidade_retorno,
        valor_unidade,
        nomeVendedor
      );

      res.status(201).json(resultado);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async verificarSaidaHoje(req, res) {
  try {
    const { nomeVendedor } = req.params;

    const saida = await SaidaVendedorModel.verificarSaidaHojePorNome(nomeVendedor);

    if (!saida) {
      return res.status(404).json({ mensagem: "Nenhuma saída encontrada hoje para este vendedor." });
    }

    res.status(200).json(saida); // { idSaida: ... }
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


}

export default new SaidaVendedorController();
