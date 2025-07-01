import { connectToDataBase } from '../db/connection.js';

class UsuarioModel {
  async encontrarPorEmail(email) {
    const conexao = await connectToDataBase();
    const [rows] = await conexao.execute('SELECT * FROM USUARIO WHERE EMAIL = ?', [email]);
    return rows[0];
  }

  async salvarCodigoRecuperacao(email, codigo, expiracao) {
    const conexao = await connectToDataBase();
    await conexao.execute(
      'UPDATE USUARIO SET CODIGO_RECUPERACAO = ?, EXPIRACAO_CODIGO = ? WHERE EMAIL = ?',
      [codigo, expiracao, email]
    );
  }

  async verificarCodigo(email, codigo) {
    const conexao = await connectToDataBase();
    const [rows] = await conexao.execute(
      'SELECT * FROM USUARIO WHERE EMAIL = ? AND CODIGO_RECUPERACAO = ? AND EXPIRACAO_CODIGO > NOW()',
      [email, codigo]
    );
    return rows.length > 0;
  }

  async alterarSenha(email, novaSenhaHash) {
    const conexao = await connectToDataBase();
    await conexao.execute(
      'UPDATE USUARIO SET SENHA = ?, CODIGO_RECUPERACAO = NULL, EXPIRACAO_CODIGO = NULL WHERE EMAIL = ?',
      [novaSenhaHash, email]
    );
  }
}

export default new UsuarioModel();
