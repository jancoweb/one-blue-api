const conexao = require('../../conexao');

const excluirCadastro = async (req,res) =>{
  const { usuario } = req;
  const { id } = usuario;
  
  try {
    const checkQuery = 'select * from usuarios where id = $1';
    const check = await conexao.query(checkQuery, [id]);
  
    if(check.rowCount === 0) return res.status(404).json('Usuário não encontrado');

    const deleteQuery = 'delete from usuarios where id = $1';
    await conexao.query(deleteQuery, [id]);

    return res.status(200).send();
  } catch (e) {
    return res.send(e.message);
  }
}

module.exports = excluirCadastro;