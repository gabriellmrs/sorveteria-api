import fornecedorModel from '../models/fornecedorModel.js'

const postFornecedor = (async (req, res) => {
    try {
        const {nome, telefone} = req.body
        await fornecedorModel.createFornecedor(nome, telefone)
        res.status(200).send('FORNECEDOR CADASTRADO COM SUCESSO!')
    }
    catch(err) {
        res.status(500).json({ error: err.message })
    }
})

const getFornecedor = (async (req, res) => {
    try {
        const row = await fornecedorModel.findAll()
        res.status(200).json(row)
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
})

const alterFornecedor = (async (req, res) => {
    try {
        const {id, nome, telefone} = req.body
        await fornecedorModel.updateFornecedor(id, nome, telefone)
        res.status(200).send('FORNECEDOR ATUALIZADO!!')
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
})

const removeFornecedor = (async (req, res) => {
    try {
        const {id} = req.body
        await fornecedorModel.deleteFornecedor(id)
        res.status(200).send('FORNECEDOR REMOVIDO COM SUCESSO!!')
    }
    catch(err) {
        res.status(500).json({erro: err.message})
    }
})

export default {
    postFornecedor,
    getFornecedor,
    alterFornecedor,
    removeFornecedor
}