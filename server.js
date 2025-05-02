import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import clienteRoute from './routes/clienteRoute.js'
import fornecedorRoute from './routes/fornecedorRoute.js'
import produtoRoute from './routes/produtoRoute.js'
import vendaBalcaoRoute from './routes/vendaBalcaoRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(clienteRoute)
app.use(fornecedorRoute)
app.use(produtoRoute)
app.use(vendaBalcaoRoute)


app.listen(5000)