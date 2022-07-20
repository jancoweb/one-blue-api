const express = require('express');
const auth = require('../Controladores/Auth/auth');
const criarPost = require('../Controladores/Posts/criarPost');
const curtirPost = require('../Controladores/Posts/curtirPost');
const editarPost = require('../Controladores/Posts/editarPost');
const excluirPost = require('../Controladores/Posts/excluirPost');
const listarPosts = require('../Controladores/Posts/listarPosts');
const listarPostUsuario = require('../Controladores/Posts/listarPostUsuario');
const cadastrar = require('../Controladores/Usuario/cadastro');
const editarCadastro = require('../Controladores/Usuario/editarCadastro');
const excluirCadastro = require('../Controladores/Usuario/excluirCadastro');
const login = require('../Controladores/Usuario/login');
const visualizarCadastro = require('../Controladores/Usuario/visualizarCadastro');

const rotas = express();

rotas.post('/cadastrar', cadastrar);
rotas.post('/login', login);
rotas.get('/perfil', auth, visualizarCadastro);
rotas.put('/perfil/editar', auth, editarCadastro);
rotas.delete('/perfil/excluir-conta', auth, excluirCadastro);

rotas.post('/publicar', auth, criarPost);
rotas.get('/perfil/posts', auth, listarPostUsuario);
rotas.put('/perfil/posts/editar/:id', auth, editarPost);
rotas.get('/home/posts', auth, listarPosts);
rotas.patch('/curtir/:id', auth, curtirPost);
rotas.delete('/perfil/posts/excluir/:id', auth, excluirPost);

module.exports = rotas;