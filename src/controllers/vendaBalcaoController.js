import vendaBalcaoModel from "../models/vendaBalcaoModel.js";

const postVenda = (async (req, res) => {
    try {
        const {valorVenda, formaDePagamento, valorPago} = req.body
        await vendaBalcaoModel.createVenda(valorVenda, formaDePagamento, valorPago)
        res.status(200).send('Venda registrada com sucesso!!')
    }
    catch(err) {
        res.status(500).json({ error: err.message })
    }
})

//BUSCA VENDAS DO DIA
const getVendaDia = (async (req, res) => {
    try {
        const row = await vendaBalcaoModel.find()
        res.status(200).json(row)
    }
    catch(err) {
        res.status(500).json({ error: err.message})
    }
})

const alterVenda = (async (req, res) => {
    try {
        const {valorVenda, formaDePagamento, valorPago} = req.body
        const {id} = req.params
        await vendaBalcaoModel.updateVenda(id, valorVenda, formaDePagamento, valorPago)
        res.status(200).send('Venda alterada com sucesso!')
    }
    catch(err) {
        res.status(500).json({ error: err.message })
    }
})

const removeVenda = (async (req, res) => {
    try {
        const {id} = req.params
        await vendaBalcaoModel.deleteVenda(id)
        res.status(200).send('Venda deletada com sucesso!')
    }
    catch(err) {
        res.status(500).json({erro: err.message})
    }
})

export default {
    postVenda,
    getVendaDia,
    alterVenda,
    removeVenda
}