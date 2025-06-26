import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import clienteRoute from './routes/clienteRoute.js'
import fornecedorRoute from './routes/fornecedorRoute.js'
import produtoRoute from './routes/produtoRoute.js'
import vendaBalcaoRoute from './routes/vendaBalcaoRoute.js'
import saidaCaixaRoute from './routes/saidaCaixaRoute.js'
import vendaClienteRoute from './routes/vendaClienteRoute.js'
import vendedorRoute from './routes/vendedorRoute.js'
import saidaVendedorRoute from './routes/saidaVendedorRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(clienteRoute)
app.use(fornecedorRoute)
app.use(produtoRoute)
app.use(vendaBalcaoRoute)
app.use(saidaCaixaRoute)
app.use(vendaClienteRoute)
app.use(vendedorRoute)
app.use(saidaVendedorRoute)

app.listen(5000)