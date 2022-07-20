const conexao = require('../../conexao');

const curtirPost = async (req, res)=>{
  const { id: idPost } = req.params;

  try {
    const query = 'select id, curtidas from pensamentos where id = $1';
    const post = await conexao.query(query, [idPost]);

    if(post.rowCount === 0) return res.status(404).json('Pensamento não encontrado')

    let curtidasTotal = post.rows[0].curtidas + 1;
    const patchQuery = 'update pensamentos set curtidas = $1 where id = $2';
    await conexao.query(patchQuery, [curtidasTotal, idPost]);
    
    return res.status(204).send();
  } catch (e) {
    return res.send(e.message);
  }
}

module.exports = curtirPost;