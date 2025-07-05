import express from 'express';
import { enviarCodigo, redefinirSenha, obterUsuario } from '../src/controllers/usuarioController.js';

const router = express.Router();

router.post('/usuario/esqueci-senha', enviarCodigo);
router.post('/usuario/redefinir-senha', redefinirSenha);
router.get('/usuario', obterUsuario);

export default router;
