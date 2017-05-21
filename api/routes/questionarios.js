var express = require('express');
var router = express.Router();
var PadraoRoute = require('./padrao_route');

var Questionario = require('../models/Questionario');
var Pergunta = require('../models/Pergunta');

/* retorna uma lista com todos os questionarios */
router.get('/:idUsuario', function(req, res, next) {
  try{
    Questionario.find({usuarioCriacao:req.params.idUsuario}, function(err, questionarios){
      if(err){
        console.log("QUESTIONARIO ROUTE - ERROR - FIND QUESTIONARIOS", err);
        return PadraoRoute.error(res, "Erro ao buscar os questionarios");
      }
      return PadraoRoute.sucess(res, questionarios);
    });
        
  }catch(e){
    console.log("QUESTIONARIO ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});


// cria novo usuario
router.post('/novo', function(req, res, next){
  try{
    if(req.body){
      //TODO colocar teste para verificar email já cadastrado
      var questionario = new Questionario();
      questionario.nome = req.body.nome;
      questionario.ativo = true;
      questionario.usuario = req.body.idUsuario;
      questionario.dataCriacao = new Date();
      questionario.perguntas = [];

      for(var i=0; i<req.body.perguntas.length; i++){
        var perguntaBody = req.body.perguntas[i];
        var pergunta =new Pergunta();
        pergunta.pergunta = perguntaBody.pergunta;
        pergunta.tipoResposta = perguntaBody.tipoResposta;
        pergunta.respostaPossiveis = perguntaBody.respostaPossiveis;
        pergunta.obrigatorio = perguntaBody.obrigatorio;
        pergunta.ordem =perguntaBody.ordem;

        pergunta.save(function(err, perguntaDb, numAffected){
          if(err){
            console.log("ERRO AO SALVAR PERGUNTA", err);
            return PadraoRoute.error(res, "Não foi possível criar o questionário!");  
          }
          if(perguntaDb){
            questionario.perguntas.push(perguntaDb._id);
          }
        });
      }
      
      questionario.save(function(err, questionarioDB, numAffected){
        if(err) {
          console.log("ERRO AO SALVAR QUESTIONARIO", err);
          return PadraoRoute.error(res, "Não foi possível criar o questionário!");
        }
        if(questionarioDB){
          return PadraoRoute.sucess(res, "Questionário criado com sucesso!");  
        }        
      });

    }

  }catch(e){
    console.log("QUESTIONARIO ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});

module.exports = router;
