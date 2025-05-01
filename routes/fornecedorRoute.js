import express from 'express'
import fornecedorController from '../src/controllers/fornecedorController.js'

const router = express.Router()

router.post('/fornecedor', fornecedorController.postFornecedor)
router.get('/fornecedor', fornecedorController.getFornecedor)
router.put('/fornecedor/:id', fornecedorController.alterFornecedor)
router.delete('/fornecedor/:id', fornecedorController.removeFornecedor)
router.get('/fornecedor/:nome', fornecedorController.getFornecedorByName)


export default router
