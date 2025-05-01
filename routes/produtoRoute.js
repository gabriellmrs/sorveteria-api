import express from 'express'
import produtoController from '../src/controllers/produtoController.js'

const route = express.Router()

route.post('/produto', produtoController.postProduto)
route.get('/produto', produtoController.getProduto)
route.put('/produto', produtoController.alterProduto)
route.delete('/produto', produtoController.removeProduto)
route.get('/produto/:nome', produtoController.getProdutoByName)

export default route 