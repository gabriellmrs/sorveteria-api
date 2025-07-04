import express from 'express';
import SaidaVendedorController from '../controllers/saidaVendedorController.js';

const router = express.Router();

// Criar nova saída
router.post('/carrinho/:nomeVendedor', SaidaVendedorController.criarSaida);

// Inserir produtos na saída
router.post('/carrinho/:idSaida/produtos', SaidaVendedorController.inserirProdutos);

// Atualizar quantidade de retorno por nome do vendedor e produto (data de hoje)
router.put('/carrinho/:nomeVendedor/retorno-produto', SaidaVendedorController.atualizarRetornoPorNomeEProduto);

// Consultar produtos levados por um vendedor hoje
router.get('/carrinho/hoje/:nomeVendedor', SaidaVendedorController.consultarProdutosHojePorVendedor);

// Calcular total a pagar hoje por nome do vendedor
router.get('/carrinho/total-hoje/:nomeVendedor', SaidaVendedorController.calcularTotalHojePorVendedor);

//Inserir produto com nome do vendedor e data atual
router.post('/carrinho/:nomeVendedor/produto-dia', SaidaVendedorController.inserirProdutoPorNome);

router.get('/carrinho/:nomeVendedor/saida-hoje', SaidaVendedorController.verificarSaidaHoje);

// Total do mês por vendedor
router.get('/carrinho/total-mes/:nomeVendedor', SaidaVendedorController.calcularTotalMesPorVendedor);

// Total do mês de todos os vendedores
router.get('/carrinho/total-mes', SaidaVendedorController.calcularTotalMesTodos);



// Consultar saída detalhada
//router.get('/carrinho/:idSaida', SaidaVendedorController.consultarSaida);

// Calcular total a pagar
//router.get('/carrinho/:idSaida/total', SaidaVendedorController.calcularTotal);

// Deletar saída
router.delete('/carrinho/:idSaida', SaidaVendedorController.deletarSaida);

export default router;
