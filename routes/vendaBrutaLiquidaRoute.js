import express from 'express';
import vendaBrutaLiquidaController from '../src/controllers/vendaBrutaLiquidaController.js';

const router = express.Router();

// Total bruto e líquido do mês
router.post('/totais-mensais', vendaBrutaLiquidaController.getTotaisDoMes);


export default router;
