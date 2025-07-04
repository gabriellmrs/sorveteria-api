import express from 'express'
import vendaBalcaoController from '../src/controllers/vendaBalcaoController.js'

const router = express.Router()

router.post('/venda',vendaBalcaoController.postVenda)
router.get('/venda', vendaBalcaoController.getVendaDia)
router.put('/venda/:id', vendaBalcaoController.alterVenda)
router.delete('/venda/:id', vendaBalcaoController.removeVenda)
router.post('/venda/filtro', vendaBalcaoController.getVendaFilter)
router.get('/venda/total-mes', vendaBalcaoController.getTotalMesBalcao);


export default router