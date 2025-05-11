import saidaCaixaModel from "../models/SaidaCaixaModel.js"

const postSaida = (async (req, res) => {
    try {
        const {nome, descricao, valor} = req.body
        if(nome === null || valor === null) {
            res.status(500).send('Preencha os campos')
        }
        else {
            await saidaCaixaModel.createSaida(nome, descricao, valor)
            res.status(200).send('Saida de Caixa Cadastrada')
        }
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
})

const getSaida = (async (req, res) => {
    try {
        const row = await saidaCaixaModel.findAll()
        res.status(200).json(row)
    }
    catch(err) {
        res.status(500).json({ error: err.message})
    }
})

const getSaidaDay = (async (req, res) => {
    try {
        const row = await saidaCaixaModel.find()
        res.status(200).json(row)
    }
    catch(err) {
        res.status(500).json({ error: err.message})
    }
})

//BUSCA POR VENDA COM FILTRO
const getSaidaFilter = async (req, res) => {
    try {
        const filtros = {};
        const { ano, mes, dia, valor, descricao, nome } = req.body;

        if (!isNaN(parseInt(ano))) filtros.ano = parseInt(ano);
        if (!isNaN(parseInt(mes))) filtros.mes = parseInt(mes);
        if (!isNaN(parseInt(dia))) filtros.dia = parseInt(dia);
        if (!isNaN(parseFloat(valor))) filtros.valor = parseFloat(valor);
        if (typeof descricao === 'string' && descricao.trim() !== '') {
            filtros.descricao = descricao.trim();
        }
        if (typeof nome === 'string' && nome.trim() !== '') {
            filtros.nome = nome.trim();
        }

        const rows = await saidaCaixaModel.findByFilter(filtros);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const removeSaida = (async (req, res) => {
    try {
        const {id} = req.params
        await saidaCaixaModel.deleteSaida(id)
        res.status(200).send('Saida removida com sucesso!')
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
})

const alterSaida = (async (req, res) => {
    try {
        const {id, nome, valor, descricao} = req.body
        await saidaCaixaModel.updateSaida(id, nome, valor, descricao)
        res.status(200).send('Saida editada com sucesso')
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
})

export default {
    postSaida,
    getSaida,
    getSaidaFilter,
    removeSaida,
    alterSaida,
    getSaidaDay
}