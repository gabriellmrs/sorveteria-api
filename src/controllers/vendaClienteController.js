import vendaClienteModel from "../models/vendaClienteModel.js"

const postVenda = async (req, res) => {
    try {
        const { nome, valor } = req.body

        if (!nome || !valor) {
            return res.status(400).send("CAMPO VAZIO")
        }

        await vendaClienteModel.createVendaPorNomeCliente(nome, valor)
        res.status(200).send("Venda cadastrada com sucesso!")
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getVendasDoDia = async (req, res) => {
    try {
        const rows = await vendaClienteModel.findVendasDoDia()
        res.status(200).json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


const getVendaClienteFilter = async (req, res) => {
    try {
        const filtros = {}
        const {
            ano,
            mes,
            dia,
            valor_compra,
            nome,
            cidade,
            bairro
        } = req.body

        if (!isNaN(parseInt(ano))) filtros.ano = parseInt(ano)
        if (!isNaN(parseInt(mes))) filtros.mes = parseInt(mes)
        if (!isNaN(parseInt(dia))) filtros.dia = parseInt(dia)
        if (!isNaN(parseFloat(valor_compra))) filtros.valor_compra = parseFloat(valor_compra)

        if (typeof nome === 'string' && nome.trim() !== '') {
            filtros.nome = nome.trim()
        }

        if (typeof cidade === 'string' && cidade.trim() !== '') {
            filtros.cidade = cidade.trim()
        }

        if (typeof bairro === 'string' && bairro.trim() !== '') {
            filtros.bairro = bairro.trim()
        }

        const rows = await vendaClienteModel.findByFilter(filtros)
        res.status(200).json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const alterVenda = async (req, res) => {
    try {
        const { valorCompra } = req.body
        const { id } = req.params
        await vendaClienteModel.updateVenda(id, valorCompra)
        res.status(200).send('Venda alterada')
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteVenda = async (req, res) => {
    try {
        const { id } = req.params
        await vendaClienteModel.deleteVenda(id)
        res.status(200).send("Venda removida com sucesso!")
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getTotalMesPorNomeCliente = async (req, res) => {
    try {
        const { nome } = req.params;

        if (!nome) {
            return res.status(400).json({ error: "Nome do cliente é obrigatório." });
        }

        const resultado = await vendaClienteModel.getTotalMesPorNomeCliente(nome);

        if (!resultado) {
            return res.status(404).json({ mensagem: "Nenhuma venda encontrada este mês para este cliente." });
        }

        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getTotalMesGeral = async (req, res) => {
    try {
        const resultado = await vendaClienteModel.getTotalMesGeral();
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export default {
    postVenda,
    deleteVenda,
    getVendaClienteFilter,
    alterVenda,
    getVendasDoDia,
    getTotalMesPorNomeCliente,
    getTotalMesGeral
}

