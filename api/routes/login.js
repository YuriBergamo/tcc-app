/**
 * Created by yuribergamo on 14/01/17.
 */

var express = require('express');
var router = express.Router();
var Usuario = require('../models/Usuario');
var PadraoRoute= require('./padrao_route');

// login usuario
router.post('/', function(req, res, next){
  try{
    if(req.body){
      Usuario.findOne({"email":req.body.email, "senha":req.body.senha}, function(err, usuario){
          if(err){
            console.log("LOGIN ROUTE - ERROR - FIND ONE ", err);
            return PadraoRoute.error(res, "Servidor indisponível no momento");
          }
          if(usuario){
              //gera a session
              session = req.session;
              session.user = usuario.email;
              session.tipo = usuario.tipo;
              console.log("SESSION", session);
              return PadraoRoute.sucess(res, usuario);
          }
          return PadraoRoute.error(res, "Email ou senha inválidos!");
      });
    }else{
        return PadraoRoute.error(res, "Não foi enviado o login! ");  
    }
  }catch(e){
    console.log("LOGIN ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
  
});


module.exports = router;

