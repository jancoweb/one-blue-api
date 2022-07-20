const conexao = require('../../conexao');

const editarPost = async (req, res)=>{
  const { id: idPost } = req.params;
  const { id: idUsuario } = req.usuario;
  const { conteudo } = req.body;

  if(!conteudo) return res.status(400).json('O campo não pode estar vazio');

  try {
    const query = 'select conteudo from pensamentos where id = $1 and usuario_id = $2';
    const post = await conexao.query(query, [idPost, idUsuario]);

    if(post.rowCount === 0) return res.status(401).json('Não autorizado');

    const attQuery = 'update pensamentos set conteudo = $1 where id = $2';
    await conexao.query(attQuery, [conteudo, idPost]);

    return res.status(201).send()
  } catch (e) {
    return res.send(e.message)
  }
}

module.exports = editarPost;