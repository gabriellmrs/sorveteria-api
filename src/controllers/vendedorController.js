import vendedorModel from "../models/vendedorModel.js";

const postVendedor = async (req, res) => {
    try {
        const { nome, bairro, rua, numero_casa, telefone } = req.body;

        if (!nome || !bairro || !rua || !numero_casa || !telefone) {
            return res.status(400).send("CAMPO VAZIO");
        }

        await vendedorModel.createVendedor(nome, bairro, rua, numero_casa, telefone);
        res.status(200).send("Vendedor cadastrado com sucesso!!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVendedor = async (req, res) => {
    try {
        const rows = await vendedorModel.findAll();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVendedorByName = async (req, res) => {
    try {
        const nome = req.params.nome;
        const row = await vendedorModel.findById(`%${nome}%`);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const alterVendedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, bairro, rua, numero_casa, telefone } = req.body;

        await vendedorModel.updateVendedor(id, nome, bairro, rua, numero_casa, telefone);
        res.status(200).send("Vendedor atualizado!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeVendedor = async (req, res) => {
    try {
        const { id } = req.params;
        await vendedorModel.deleteVendedor(id);
        res.status(200).send("Vendedor removido");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    postVendedor,
    getVendedor,
    getVendedorByName,
    alterVendedor,
    removeVendedor
};
