import produtoModel from "../models/produtoModel.js";

const postProduto = (async (req, res) => {
    try {
        const {nome, valor} = req.body
        if(nome === null || valor === null) {
            res.status(500).send('CAMPO VAZIO')
        }
        else {
            await produtoModel.createProduto(nome, valor)
            res.status(200).send('Produto cadastrado com sucesso!!')
        }
    }
    catch(err) {
       res.status(500).json({ error: err.message })
    }
})

const getProduto = (async (req, res) => {
    try {
        const row = await produtoModel.findAll()
        res.status(200).json(row)
    }
    catch(err) {
        res.status(500).json({ error: err.message})
    }
})

const getProdutoByName = (async (req, res) => {
    try {
        const nome = req.params.nome
        const row = await produtoModel.findByName(nome)
        res.status(200).json(row)
    }
    catch(err) {
        res.status(500).json({ error: err.message })
    }
})

const alterProduto = (async (req, res) => {
    try {
        const {nome, valor} = req.body
        const { id } = req.params; 
        await produtoModel.updateProduto(id, nome, valor)
        res.status(200).send('Produto atualizado!')
    }
    catch(err) {
        res.status(500).json({ error: err.message })
    }
})

const removeProduto = (async (req, res) => {
    try {
        const {id} = req.params
        await produtoModel.deleteProduto(id)
        res.status(200).send('Produto removido')
    }
    catch(err) {
        res.status(500).json({ error: err.message})
    }
})


export default {
    postProduto,
    getProduto,
    alterProduto,
    removeProduto,
    getProdutoByName
}