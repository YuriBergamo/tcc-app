var express = require('express');
var router = express.Router();
var PadraoRoute = require('./padrao_route');


var Usuario = require('../models/Usuario');
var RespostaQuestionario = require('../models/RespostaQuestionario');



/* retorna uma lista de todos os pacientes ativos do profissional */
router.get('/:id', function(req, res, next) {
  try{      
      if(req.session){
          Usuario.find({profissional:req.params.id, ativo:true}, function(err, pacientes){
            if(err){
              console.log("PACIENTE ROUTE - ERROR - FIND PACIENTES", err);
              return PadraoRoute.error(res, "Erro ao buscar os pacientes");
              }            
            return PadraoRoute.sucess(res, pacientes);
          });
      }else{
          return PadraoRoute.unauthorized(res);
      }
      
  }catch(e){
    console.log("PACIENTE ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});

router.get('/:id/questionarios', function(req, res, next) {
  try{      
      if(req.session){

        RespostaQuestionario.find({
                usuario:req.params.id
            })
            .populate('questionario')
            .exec(function(err, respostas){
                if(err){
                    console.log("PACIENTES ROUTE - ERROR - FIND RespostaQuestionario", err);
                    return PadraoRoute.error(res, "Erro ao buscar os questionarios de um paciente");
                }
                return PadraoRoute.sucess(res, respostas);                  
            });
          
      }else{
          return PadraoRoute.unauthorized(res);
      }
      
  }catch(e){
    console.log("USER PACIENTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});

module.exports =router;


