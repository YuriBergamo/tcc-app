/**
 * Created by yuribergamo on 14/01/17.
 */

var express = require('express');
var router = express.Router();
var Usuario = require('../models/Usuario');

// login usuario
router.post('/', function(req, res, next){
  if(req.body.login){
    Usuario.findOne({"email":req.body.login.email, "senha":req.body.login.senha}, function(err, usuario){
        if(err){
          console.log("erro login", err);
          return retornaErro(res, "Servidor indisponível no momento");
        }
        if(usuario){
            return retornaSucess(res, usuario);
        }
        return retornaErro(res, "Email ou senha inválidos!");
        
    });
  }
});

function retornaErro(res, mensagem){
  return res.json({status:400, data:mensagem});
}
function retornaSucess(res, data){
  return res.json({status:200, data:data});
}

module.exports = router;

