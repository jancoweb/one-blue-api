const visualizarCadastro = async (req, res)=>{
  const { usuario } = req;
  return res.status(200).json(usuario);
};

module.exports = visualizarCadastro;