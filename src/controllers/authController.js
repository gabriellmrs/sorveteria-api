import { connectToDataBase } from '../db/connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const conexao = await connectToDataBase()
    const [usuarios] = await conexao.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (usuarios.length === 0) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) return res.status(401).json({ erro: 'Senha inválida' });

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.SECRET_KEY, {
      expiresIn: '8h',
    });

    res.json({ token });
  } catch (err) {
  console.error('Erro ao fazer login:', err); // mostra no console
  res.status(500).json({ erro: 'Erro no servidor' });
}

}
