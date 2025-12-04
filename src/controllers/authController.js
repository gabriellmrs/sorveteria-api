import { connectToDataBase } from '../db/connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const conexao = await connectToDataBase();
    const [usuarios] = await conexao.execute('SELECT * FROM usuario WHERE EMAIL = ?', [email]);

    if (usuarios.length === 0) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const usuario = usuarios[0];

    // Verifica se o campo de senha existe
    const senhaHash = usuario.SENHA || usuario.senha;
    if (!senhaHash) {
      return res.status(500).json({ erro: 'Senha não está definida no banco para este usuário.' });
    }

    const senhaValida = await bcrypt.compare(senha, senhaHash);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: usuario.ID || usuario.id, email: usuario.EMAIL || usuario.email, role: usuario.ROLE || usuario.role },
      process.env.SECRET_KEY,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
}
