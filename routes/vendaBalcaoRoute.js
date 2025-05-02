import express from 'express'
import vendaBalcaoController from '../src/controllers/vendaBalcaoController.js'

const route = express.Router()

route.post('/venda',vendaBalcaoController.postVenda)
route.get('/venda', vendaBalcaoController.getVendaDia)
route.put('/venda/:id', vendaBalcaoController.alterVenda)
route.delete('/venda/:id', vendaBalcaoController.removeVenda)

export default route