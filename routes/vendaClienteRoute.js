import express from 'express'
import vendaClienteController from '../src/controllers/vendaClienteController.js'
import clienteController from '../src/controllers/clienteController.js'

const router = express.Router()

router.post('/v-cliente',vendaClienteController.postVenda)
router.get('/v-cliente', vendaClienteController.getVendasDoDia)
router.delete('/v-cliente/:id', vendaClienteController.deleteVenda)
router.put('/v-cliente/:id',vendaClienteController.alterVenda)
router.post('/v-cliente/:filter',vendaClienteController.getVendaClienteFilter)
router.post('/clientes/:nome', clienteController.getClienteById)

export default router