import express from 'express'
import clienteController from '../src/controllers/clienteController.js'

const router = express.Router()

router.get('/clientes', clienteController.getCliente)
router.post('/clientes/:nome', clienteController.getClienteById)
router.post('/clientes/cidade/:cidade', clienteController.getClienteByCity)
router.post('/clientes/bairro/:bairro', clienteController.getClienteByBairro)
router.post('/clientes', clienteController.postCliente)
router.put('/clientes/:id', clienteController.alterCliente)
router.delete('/clientes/:id', clienteController.removeCliente)

export default router