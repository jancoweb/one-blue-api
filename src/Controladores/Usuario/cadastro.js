const conexao = require('../../conexao');
const securePassword = require('secure-password');

const password = securePassword();

const cadastrar = async (req,res) => {
  const { nome, email, senha } = req.body;

  if(!nome || !email || !senha) return res.status(400).json('Todos os campos são obrigatórios');

  try {
    const query = 'select * from usuarios where email = $1';
    const emailCheck = await conexao.query(query, [email]);

    if(emailCheck.rowCount > 0) return res.status(400).json('Email já cadastrado');

  } catch (e) {
    res.send(e.message);
  }

  try {
    const hash = (await password.hash(Buffer.from(senha))).toString('hex');
    const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3)';
    const usuarioCadastrado = await conexao.query(query,[nome, email, hash]);

    if(usuarioCadastrado.rowCount === 0) return res.status(400).json('Não foi possível realizar o cadastro');

    return res.status(204).send();

  } catch (e) {
    res.send(e.message)
  }
}

module.exports = cadastrar;