import express from 'express'
import saidaCaixaController from '../src/controllers/saidaCaixaController.js'

const router = express.Router()

router.post('/saida',saidaCaixaController.postSaida)
router.get('/saida',saidaCaixaController.getSaida)
router.get('/saida/dia',saidaCaixaController.getSaidaDay)
router.post('/saida/:filtro',saidaCaixaController.getSaidaFilter)
router.delete('/saida/:id',saidaCaixaController.removeSaida)
router.put('/saida/:id',saidaCaixaController.alterSaida)

export default router