import express from 'express'
import saidaCaixaController from '../src/controllers/saidaCaixaController.js'

const route = express.Router()

route.post('/saida',saidaCaixaController.postSaida)
route.get('/saida',saidaCaixaController.getSaida)
route.post('/saida/:filtro',saidaCaixaController.getSaidaFilter)
route.delete('/saida/:id',saidaCaixaController.removeSaida)
route.put('/saida/:id',saidaCaixaController.alterSaida)

export default route