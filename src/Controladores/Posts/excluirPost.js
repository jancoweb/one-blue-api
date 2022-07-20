const conexao = require('../../conexao');

const excluirPost = async(req, res) =>{
  const { id: idUsuario } = req.usuario;
  const { id: idPost } = req.params;
  try {
    const checkQuery = 'select * from pensamentos where usuario_id = $1 and id = $2';
    const checkResponse = await conexao.query(checkQuery, [idUsuario, idPost]);
  
    if(checkResponse.rowCount === 0) return res.status(404).json('Pensamento não encontrado');

    const deleteQuery = 'delete from pensamentos where id = $1';
    const deletar = await conexao.query(deleteQuery, [idPost]);

    if(deletar.rowCount === 0) return res.status(404).json('Pensamento não encontrado');

    return res.status(200).send()
  
  } catch (e) {
    return res.send(e.message)
  }
}

module.exports = excluirPost;