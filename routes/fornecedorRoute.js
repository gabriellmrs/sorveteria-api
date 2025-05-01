import express from 'express'
import fornecedorController from '../src/controllers/fornecedorController.js'

const router = express.Router()

router.post('/fornecedor', fornecedorController.postFornecedor)
router.get('/fornecedor', fornecedorController.getFornecedor)
router.put('/fornecedor', fornecedorController.alterFornecedor)
router.delete('/fornecedor', fornecedorController.removeFornecedor)


export default router
