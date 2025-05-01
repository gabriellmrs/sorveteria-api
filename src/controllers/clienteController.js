import clienteModel from '../models/clienteModel.js'

const getCliente = (async (req, res) => {
    try {
        const row = await clienteModel.findAll()
        res.status(200).json(row)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const getClienteById = (async (req, res) => {
    try {
        const nome = req.body.NOME
        const row = await clienteModel.findByID(nome)
        res.status(200).json(row)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const getClienteByCity = async (req, res) => {
    try {
        const cidade = req.body.CIDADE;

        if (!cidade) {
            return res.status(400).json({ error: 'Cidade não fornecida' });
        }

        const rows = await clienteModel.findByCity(cidade);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum cliente encontrado para essa cidade' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        console.error('Erro ao buscar cliente por cidade:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const getClienteByBairro = async (req, res) => {
    try {
        const bairro = req.body.BAIRRO;

        if (!bairro) {
            return res.status(400).json({ error: 'Bairro não fornecida' });
        }

        const rows = await clienteModel.findByBairro(bairro);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum cliente encontrado para esse bairro' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        console.error('Erro ao buscar cliente por bairro:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
  

const postCliente = (async (req, res) => {
    try {
        const {NOME, ESTADO, CIDADE, BAIRRO, ENDERECO, TELEFONE, CNPJ_CPF} = req.body
        await clienteModel.createCliente(NOME, ESTADO, CIDADE, BAIRRO, ENDERECO, TELEFONE, CNPJ_CPF)
        res.status(200).send('CLIENTE CRIADO COM SUCESSO!')
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const alterCliente = (async (req, res) => {
    try{
        const {NOME, ESTADO, CIDADE, BAIRRO, ENDERECO, TELEFONE, CNPJ_CPF, ID} = req.body
        await clienteModel.updateCliente(ID, NOME, ESTADO, CIDADE, BAIRRO, ENDERECO, TELEFONE, CNPJ_CPF)
        res.status(200).send('CLIENTE ATUALIZADO')
    }
    catch(err) {
        res.status(500).json({ error: err.message })
    }
})

const removeCliente = async (req, res) => {
    try {
        const id = req.params.id; 
        await clienteModel.deleteCliente(Number(id));
        res.status(200).send('CLIENTE DELETADO COM SUCESSO!');
    } catch(err) {
        console.error("Erro ao deletar cliente:", err);
        res.status(500).json({ error: err.message });
    }
}


export default {
    getCliente,
    getClienteById,
    getClienteByCity,
    getClienteByBairro,
    postCliente,
    alterCliente,
    removeCliente
}
