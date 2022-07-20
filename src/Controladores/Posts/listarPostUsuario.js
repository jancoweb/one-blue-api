const conexao = require('../../conexao');

const listarPostUsuario = async(req, res)=>{
  const { id: idUsuario } = req.usuario;

  try {

    const query = 'select * from pensamentos where usuario_id = $1';
    const posts = await conexao.query(query, [idUsuario]);

    if(posts.rowCount === 0) return res.status(404).json('Nenhum pensamento encontrado');

    return res.status(200).json(posts.rows);
    
  } catch (e) {
    return res.send(e.message)
  }
}

module.exports = listarPostUsuario;