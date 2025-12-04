import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  //Verifica se o header existe
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  //Separa o prefix beaer do token
  const [prefix, token] = authHeader.split(' ');

  if (prefix !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Formato do token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role  
    };

    next(); 
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Token expirado' });
    }

    return res.status(403).json({ erro: 'Token inválido' });
  }
}