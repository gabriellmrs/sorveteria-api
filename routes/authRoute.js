import express from 'express';
import { login } from '../src/controllers/authController.js';

const router = express.Router();

router.post('/login', login);

export default router;
