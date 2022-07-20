const conexao = require('../../conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../Auth/secret');


const password = securePassword();

const login = async (req, res) =>{
  const { email, senha } = req.body;
  
  if(!email || !senha) return res.status(400).json('Todos os campos são obrigatórios');

  try {
    const query = 'select * from usuarios where email = $1';
    const usuarioCheck = await conexao.query(query, [email]);

    if(usuarioCheck.rowCount === 0) return res.status(404).json('Email ou senha incorretos');

    const usuarioEncontrado = usuarioCheck.rows[0];
    const passwordCheck = await password.verify(Buffer.from(senha), Buffer.from(usuarioEncontrado.senha, 'hex'));

    switch(passwordCheck){
      case password.INVALID_UNRECOGNIZED_HASH: 
      case password.INVALID:
        return res.status(401).json('Email ou senha incorretos');
      case password.VALID:
        break
      case password.VALID_NEEDS_REHASH:
      try {
        const newHash = (await password.hash(Buffer.from(senha))).toString("hex");
        const query = 'update usuarios set senha = $1 where email = $2';
        await conexao.query(query, [newHash, email]);
      } catch (e) {
        return res.send(e.message)
      }
      break
    }

    const loginQuery = 'select id, nome, email from usuarios where email = $1';
    const usuarioLogado = await conexao.query(loginQuery, [email]);
    const usuario = usuarioLogado.rows[0];

    const token = jwt.sign({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }, jwtSecret);

    const response = { usuario, token };
    return res.status(200).json(response);

  } catch (e) {
    return res.send(e.message);
  }
}

module.exports = login;