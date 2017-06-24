var express = require('express');
var router = express.Router();
var PadraoRoute = require('./padrao_route');

var Questionario = require('../models/Questionario');
var Pergunta = require('../models/Pergunta');
var RespostaQuestionario = require("../models/RespostaQuestionario");

/* retorna uma lista com todos os questionarios */
router.get('/:idUsuario', function(req, res, next) {
  try{
    Questionario.find({usuario:req.params.idUsuario}, function(err, questionarios){
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


// cria novo questionario
router.post('/:idUsuario', function(req, res, next){
  try{
    if(req.body){      
      var questionario = new Questionario();
      questionario.nome = req.body.nome;
      questionario.ativo = true;
      questionario.usuario = req.params.idUsuario;
      questionario.dataCriacao = new Date();
      questionario.perguntas = [];

      for(var i=0; i<req.body.perguntas.length; i++){
        var perguntaBody = req.body.perguntas[i];
        var pergunta ={};
        pergunta.pergunta = perguntaBody.pergunta;
        pergunta.tipoResposta = perguntaBody.tipoResposta;
        pergunta.respostaPossiveis = perguntaBody.respostaPossiveis;
        pergunta.obrigatorio = perguntaBody.obrigatorio;
        pergunta.ordem =i;
        questionario.perguntas.push(pergunta);        
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

// atualiza questionario
router.post('/editar/:idQuestionario', function(req, res, next){
  console.log("ATUALIZAR");
  try{
    if(req.body){
      Questionario.findById({_id:req.params.idQuestionario}, function(err, questionarioBanco){
        if(err){
          console.log("QUESTIONARIO ROUTE - ERROR - EDITAR QUESTIONARIO", err);
          return PadraoRoute.error(res, "Erro ao editar o questionario");
        }
        if(questionarioBanco){
          var questionario = new Questionario();
          questionario.nome = req.body.nome;
          questionario.ativo = true;
          questionario.usuario = questionarioBanco.usuario;
          questionario.dataCriacao = questionarioBanco.dataCriacao;
          questionario.perguntas = [];

          for(var i=0; i<req.body.perguntas.length; i++){
            var perguntaBody = req.body.perguntas[i];
            var pergunta ={};
            pergunta.pergunta = perguntaBody.pergunta;
            pergunta.tipoResposta = perguntaBody.tipoResposta;
            pergunta.respostaPossiveis = perguntaBody.respostaPossiveis;
            pergunta.obrigatorio = perguntaBody.obrigatorio;
            pergunta.ordem =i;
            questionario.perguntas.push(pergunta);        
          }
          
          questionario.save(function(err, questionarioDB, numAffected){
            if(err) {
              console.log("ERRO AO SALVAR QUESTIONARIO", err);
              return PadraoRoute.error(res, "Não foi possível criar o questionário!");
            }
            questionarioBanco.remove(function(err, sucess){
                if(err){
                  console.log("ERRO AO DELETAR QUESTIONARIO NO ATUALIZAR", err);
                  return PadraoRoute.error(res, "Não foi possível criar o questionário!");
                }
                return PadraoRoute.sucess(res, "Questionário atualizado com sucesso!");                    
            });    
          });            
        }      
      });      
    }

  }catch(e){
    console.log("QUESTIONARIO ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});


// responder questionario
router.post('/responder/novo', function(req, res, next){
  try{
    if(req.body){      
      var resposta = new RespostaQuestionario();
      resposta.dataResposta = req.body.dataResposta;
      resposta.usuario = req.body.idUsuario;    
      resposta.questionario = req.body.idQuestionario;
      resposta.respostas = req.body.respostas;
      resposta.agenda = req.body.idAgenda;


      resposta.save(function(err, respostaDB, numAffected){
        if(err) {
          console.log("ERRO AO SALVAR RESPOSTA", err);
          return PadraoRoute.error(res, "Não foi possível salvar a resposta!");
        }
        if(respostaDB){
          return PadraoRoute.sucess(res, "RespostaQuestionario criado com sucesso!");  
        }        
      });           
    }

  }catch(e){
    console.log("RESPOSTA ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});
module.exports = router;
