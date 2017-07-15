var express = require('express');
var router = express.Router();
var PadraoRoute = require('./padrao_route');


var Usuario = require('../models/Usuario');
var Agenda = require('../models/Agenda');
var RespostaQuestionario = require('../models/RespostaQuestionario');



/* retorna uma lista de todos os agendamentos por paciente ordenados por nivelUrgencia */
router.get('/:id/pacientes', function(req, res, next) {
  try{      
      if(req.session){
          Agenda.find({
              usuario:req.params.id    
          }).sort({data:-1, hora:-1, nivelUrgencia:-1})
          .populate("profissional questionario")
          .exec(function(err, agendamentos){
              if(err){
                  console.log("AGENDA ROUTE - ERROR - FIND AGENDA PACIENTE");
                  return PadraoRoute.error(res, "Erro ao buscar os agendamentos do paciente");
              }
              return PadraoRoute.sucess(res, agendamentos);
          })          
      }else{
          return PadraoRoute.unauthorized(res);
      }
      
  }catch(e){
    console.log("AGENDA ROUTE - GET AGENDA PACIENTES - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});

/* retorna uma lista de todos os agendamentos criados pelo profissional que precisam ser aceitos ordenados por nivelUrgencia */
router.get('/:id/profissionais', function(req, res, next) {
  try{      
      if(req.session){
          Agenda.find({
              profissional:req.params.id              
          }).sort({data:-1, nivelUrgencia:-1})
          .populate("usuario questionario")
          .exec(function(err, agendamentos){
              if(err){
                  console.log("AGENDA ROUTE - ERROR - FIND AGENDA PROFISSIONAIS");
                  return PadraoRoute.error(res, "Erro ao buscar os agendamentos pendentes do profissional");
              }
              return PadraoRoute.sucess(res, agendamentos);
          })          
      }else{
          return PadraoRoute.unauthorized(res);
      }
      
  }catch(e){
    console.log("AGENDA ROUTE - GET AGENDA PROFISSIONAIS - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});

// cria o agendamento feito pelo profissional ou feito pelo paciente
router.post("/new", function(req, res, next){
  try{
      if(req.body){
            var agenda = new Agenda();
            agenda.data = req.body.data;
            agenda.hora = req.body.hora;
            agenda.nivelUrgencia = req.body.nivelUrgencia;
            agenda.tipo = req.body.tipo;
            agenda.status = req.body.status;
            agenda.usuario = req.body.usuario._id;
            agenda.profissional = req.body.profissional._id;
            agenda.questionario = req.body.questionario._id;
            agenda.observacao = req.body.observacao;

            agenda.save(function(err, agendaDB, numAffected){
                if(err){
                    console.log("AGENDA ROUTE - ERROR - SAVE AGENDA");
                    return PadraoRoute.error(res, "Erro ao salvar o agendamento");
                }

                return PadraoRoute.sucess(res, agendaDB);
            });
      }
    
  }catch(e){
    console.log("AGENDA ROUTE - SAVE AGENDA - ERROR - EXCEPTION",e);
    return PadraoRoute.error(res, e);
  }
});


// cria o agendamento feito pelo profissional ou feito pelo paciente
router.post("/:idAgenda", function(req, res, next){
  try{
      if(req.body){            
          Agenda.findById({_id:req.params.idAgenda}, function(err, agendaDB){
              if(err){
                  console.log("AGENDA ROUTE - ERROR - REGISTRO AGENDA");
                  return PadraoRoute.error(res, "Erro ao registrar o agendamento");
              }

              if(agendaDB){
                agendaDB.status = req.body.status;
                agendaDB.observacao = req.body.observacao;

                //salva a agenda
                agendaDB.save(function(err, a, numAffected){
                    if(err){
                        console.log("AGENDA ROUTE - ERROR - SAVE AGENDA");
                        return PadraoRoute.error(res, "Erro ao salvar o agendamento");
                    }
                    return PadraoRoute.sucess(res, "Registro agenda criado com sucesso!");                                    
                });                          
              }
          });            
      }
    
  }catch(e){
    console.log("AGENDA ROUTE - SAVE REGISTRO AGENDA - ERROR - EXCEPTION",e);
    return PadraoRoute.error(res, e);
  }
});



// rejeita o agendamento feito pelo paciente
router.post("/rejeitar/:idAgenda", function(req, res, next){
  try{
      if(req.body){            
          Agenda.findById({_id:req.params.idAgenda}, function(err, agendaDB){
              if(err){
                  console.log("AGENDA ROUTE - ERROR - REGISTRO AGENDA");
                  return PadraoRoute.error(res, "Erro ao registrar o agendamento");
              }

              if(agendaDB){
                agendaDB.status = "REJEITADO"                

                //salva a agenda
                agendaDB.save(function(err, a, numAffected){
                    if(err){
                        console.log("AGENDA ROUTE - ERROR - REJEITAR AGENDA");
                        return PadraoRoute.error(res, "Erro ao rejeitar o agendamento");
                    }
                    return PadraoRoute.sucess(res, "Agenda rejeitada com sucesso!");                                    
                });                          
              }
          });            
      }
    
  }catch(e){
    console.log("AGENDA ROUTE - REJEITAR AGENDA - ERROR - EXCEPTION",e);
    return PadraoRoute.error(res, e);
  }
});


// aceitar o agendamento feito pelo paciente
router.post("/aceitar/:idAgenda", function(req, res, next){
  try{
      if(req.body){            
          Agenda.findById({_id:req.params.idAgenda}, function(err, agendaDB){
              if(err){
                  console.log("AGENDA ROUTE - ERROR - ACEITAR AGENDA");
                  return PadraoRoute.error(res, "Erro ao registrar o agendamento");
              }

              if(agendaDB){
                agendaDB.status = "ACEITO"                

                //salva a agenda
                agendaDB.save(function(err, a, numAffected){
                    if(err){
                        console.log("AGENDA ROUTE - ERROR - ACEITAR AGENDA");
                        return PadraoRoute.error(res, "Erro ao aceitar o agendamento");
                    }
                    return PadraoRoute.sucess(res, "Agenda aceita!");                                    
                });                          
              }
          });            
      }
    
  }catch(e){
    console.log("AGENDA ROUTE - ACEITAR AGENDA - ERROR - EXCEPTION",e);
    return PadraoRoute.error(res, e);
  }
});

/* retorna as respostas do questionário */
router.get('/:idAgenda/questionario/:idQuestionario', function(req, res, next) {
  try{      
      if(req.session){
          RespostaQuestionario.findOne({
              agenda:req.params.idAgenda,
              questionario:req.params.idQuestionario              
          })
          .populate("usuario questionario")
          .exec(function(err, resposta){
              if(err){
                  console.log("AGENDA ROUTE - ERROR - FIND AGENDA RESPOSTA QUESTIONARIO");
                  return PadraoRoute.error(res, "Erro ao buscar os as respostas dos questionarios");
              }
              return PadraoRoute.sucess(res, resposta);
          })          
      }else{
          return PadraoRoute.unauthorized(res);
      }
      
  }catch(e){
    console.log("AGENDA ROUTE - GET AGENDA PROFISSIONAIS - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});





module.exports = router;