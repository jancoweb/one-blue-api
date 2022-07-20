const conexao = require('../../conexao');

const criarPost = async(req, res)=>{
  const { id: idUsuario } = req.usuario;
  const { conteudo } = req.body;

  try {
    const query = 'insert into pensamentos ( conteudo, usuario_id, data ) values ($1, $2, NOW())';
    const post = await conexao.query(query, [conteudo, idUsuario]);

    if(post.rowCount === 0) return res.status(400).json('Não foi possível publicar seu pensamento');

    const pensamento = post.rows[0];

    return res.status(200).json(pensamento);

  } catch (e) {
    return res.send(e.message);
  }
}

module.exports = criarPost;