import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const {PORT} = process.env

import authRoute from './routes/authRoute.js';
import authMiddleware from './src/middleware/auth.middleware.js';
import usuarioRoute from './routes/usuarioRoute.js';
import clienteRoute from './routes/clienteRoute.js';
import fornecedorRoute from './routes/fornecedorRoute.js';
import produtoRoute from './routes/produtoRoute.js';
import vendaBalcaoRoute from './routes/vendaBalcaoRoute.js';
import saidaCaixaRoute from './routes/saidaCaixaRoute.js';
import vendaClienteRoute from './routes/vendaClienteRoute.js';
import vendedorRoute from './routes/vendedorRoute.js';
import saidaVendedorRoute from './routes/saidaVendedorRoute.js';
import vendaBrutaLiquidaRoute from './routes/vendaBrutaLiquidaRoute.js';


const app = express();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',
  'https://frostsys.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



// Rota pública
app.use(authRoute);
app.use(usuarioRoute);

// Middleware: todas as rotas abaixo precisam de token
app.use(authMiddleware);

// Rotas privadas
app.use(clienteRoute);
app.use(fornecedorRoute);
app.use(produtoRoute);
app.use(vendaBalcaoRoute);
app.use(saidaCaixaRoute);
app.use(vendaClienteRoute);
app.use(vendedorRoute);
app.use(saidaVendedorRoute);
app.use(vendaBrutaLiquidaRoute);

app.listen(PORT);
