import express from 'express'
import vendaClienteController from '../src/controllers/vendaClienteController.js'

const route = express.Router()

route.post('/v-cliente',vendaClienteController.postVenda)
route.get('/v-cliente', vendaClienteController.getVendasDoDia)
route.delete('/v-cliente/:id', vendaClienteController.deleteVenda)
route.put('/v-cliente/:id',vendaClienteController.alterVenda)
route.post('/v-cliente/:filter',vendaClienteController.getVendaClienteFilter)

export default route