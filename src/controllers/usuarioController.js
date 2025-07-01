import usuarioModel from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import 'dotenv/config';

export const enviarCodigo = async (req, res) => {
    const { email } = req.body;
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expiracao = new Date(Date.now() + 15 * 60000); // 15 minutos

    try {
        const usuario = await usuarioModel.encontrarPorEmail(email);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

        await usuarioModel.salvarCodigoRecuperacao(email, codigo, expiracao);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Sistema" <${process.env.EMAIL_APP}>`,
            to: email,
            subject: 'Código de Recuperação',
            text: `Seu código é: ${codigo}`
        });

        res.status(200).json({ mensagem: 'Código enviado para o e-mail.' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export const redefinirSenha = async (req, res) => {
    const { email, codigo, novaSenha } = req.body;

    try {
        const valido = await usuarioModel.verificarCodigo(email, codigo);
        if (!valido) return res.status(400).json({ erro: 'Código inválido ou expirado' });

        const hash = await bcrypt.hash(novaSenha, 10);
        await usuarioModel.alterarSenha(email, hash);

        res.status(200).json({ mensagem: 'Senha atualizada com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
