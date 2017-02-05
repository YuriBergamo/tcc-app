var express = require('express');
var router = express.Router();

var Usuario = require('../models/Usuario');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Usuario.find({}, function(err, usuarios){
      if(err){
         console.log("Err", err);
         return retornaErro(res, "Erro ao buscar os usuarios");
      }
      return retornaSucess(res, usuarios);
  });
});


// cria novo usuario
router.post('/novo', function(req, res, next){
  if(req.body.usuario){
    var novoUsuario = new Usuario();
    novoUsuario.email = req.body.usuario.email;
    novoUsuario.senha = req.body.usuario.senha;
    novoUsuario.nome = req.body.usuario.nome;
    novoUsuario.foto = req.body.usuario.foto;
    novoUsuario.tipo = req.body.usuario.tipo;
    
    var dataConvertida = new Date(req.body.usuario.dataNascimento);
  
    novoUsuario.dataNascimento = dataConvertida;

    novoUsuario.dataCriacao = new Date();

    novoUsuario.save(function(err, product, numAffected){
      if(err) {
        console.log("ERRO AO SALVAR USUARIO", err);
        return retornaErro(res, "Não foi possível salvar o usuario");
      }
      if(numAffected == 1){
        return retornaSucess(res, "Usuário criado com sucesso!");
      }
    });
  }
});

router.post("/vincular", function(res, req, next){
    return retornaSucess(res, "Usuário vinculado com sucesso!");
});


function retornaErro(res, mensagem){
  return res.json({status:400, data:mensagem});
}
function retornaSucess(res, data){
  return res.json({status:200, data:data});
}
module.exports = router;
