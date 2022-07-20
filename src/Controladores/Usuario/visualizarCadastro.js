const conexao = require('../../conexao');

const visualizarCadastro = async (req, res)=>{
  const { usuario } = req;

  try {
    const query = 'select * from pensamentos where usuario_id = $1';
    let posts = await conexao.query(query, [usuario.id]);

    if(posts.rowCount === 0) posts = '';

    const publicacoes = posts.rows
    
    return res.status(200).json({usuario, publicacoes});
  } catch (e) {
    return res.send(e.message)
  }

};

module.exports = visualizarCadastro;