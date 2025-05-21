import express from 'express';
import vendedorController from '../src/controllers/vendedorController.js';

const router = express.Router();

router.post('/vendedor', vendedorController.postVendedor);
router.get('/vendedor', vendedorController.getVendedor);
router.get('/vendedor/:nome', vendedorController.getVendedorByName);
router.put('/vendedor/:id', vendedorController.alterVendedor);
router.delete('/vendedor/:id', vendedorController.removeVendedor);

export default router;
