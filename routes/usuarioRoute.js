import express from 'express';
import { enviarCodigo, redefinirSenha } from '../src/controllers/usuarioController.js';

const router = express.Router();

router.post('/usuario/esqueci-senha', enviarCodigo);
router.post('/usuario/redefinir-senha', redefinirSenha);

export default router;
