import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoute from './routes/authRoute.js';
import authMiddleware from './src/middleware/auth.middleware.js';

import clienteRoute from './routes/clienteRoute.js';
import fornecedorRoute from './routes/fornecedorRoute.js';
import produtoRoute from './routes/produtoRoute.js';
import vendaBalcaoRoute from './routes/vendaBalcaoRoute.js';
import saidaCaixaRoute from './routes/saidaCaixaRoute.js';
import vendaClienteRoute from './routes/vendaClienteRoute.js';
import vendedorRoute from './routes/vendedorRoute.js';
import saidaVendedorRoute from './routes/saidaVendedorRoute.js';

const app = express();

app.use(express.json());
app.use(cors());

// Rota pública
app.use(authRoute);

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

app.listen(5000);
