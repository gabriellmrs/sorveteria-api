import VendaBrutaLiquidaModel from "../models/vendaBrutaLiquidaModel.js";

const getTotaisDoMes = async (req, res) => {
  try {
    const { mes, ano } = req.body;

    const mesInt = parseInt(mes);
    const anoInt = parseInt(ano);

    if (isNaN(mesInt) || isNaN(anoInt)) {
      return res.status(400).json({ error: "Os campos 'mes' e 'ano' são obrigatórios e devem ser números." });
    }

    const resultado = await VendaBrutaLiquidaModel.calcularTotaisMes(mesInt, anoInt);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getTotaisDoMes
};
