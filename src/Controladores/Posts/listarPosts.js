const conexao = require('../../conexao');

const listarPosts = async(req, res)=>{
  try {
    const query = 'select * from pensamentos order by data desc';
    const posts = await conexao.query(query);

    if(posts.rowCount === 0) return res.status(404).json('Nenhum pensamento encontrado');

    return res.status(200).json(posts.rows);
  } catch (e) {
    return res.send(e.message);
  }
}

module.exports = listarPosts;