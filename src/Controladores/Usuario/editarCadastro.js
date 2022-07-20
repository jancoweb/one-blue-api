const conexao = require('../../conexao');
const securePassword = require('secure-password');

const password = securePassword();

const editarCadastro = async (req, res) =>{
  const { usuario } = req;

  try {
    const query = 'select * from usuarios where id = $1';
    const { rowCount } = await conexao.query(query, [usuario.id]);
  
    if(rowCount === 0) return res.status(404).json('Usuário não encontrado');

    const { nome, email, senha } = req.body;
    if(!nome || !email || !senha) return res.status(400).json('Todos os campos são obrigatórios');

    const queryEmailCheck = 'select * from usuarios where email = $1';
    const emailCheck = await conexao.query(queryEmailCheck, [email]);

    if(emailCheck.rowCount > 0) return res.status(400).json('Email já cadastrado');

    const hash = (await password.hash(Buffer.from(senha))).toString('hex');

    const queryUpdate = 'update usuarios set nome = $1, email = $2, senha = $3 where id = $4';
    const usuarioAtualizado = await conexao.query(queryUpdate,[nome, email, hash, usuario.id]);

    if(usuarioAtualizado.rowCount === 0) return res.status(404).json('Usuário não encontrado');

    return res.send().status(204);

  } catch (e) {
    return res.send(e.message);
  }
}

module.exports = editarCadastro;