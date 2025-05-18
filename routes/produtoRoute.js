import express from 'express'
import produtoController from '../src/controllers/produtoController.js'

const router = express.Router()

router.post('/produto', produtoController.postProduto)
router.get('/produto', produtoController.getProduto)
router.put('/produto/:id', produtoController.alterProduto)
router.delete('/produto/:id', produtoController.removeProduto)
router.get('/produto/:nome', produtoController.getProdutoByName)

export default router 