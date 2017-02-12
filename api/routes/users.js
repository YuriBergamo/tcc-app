var express = require('express');
var router = express.Router();
var PadraoRoute = require('./padrao_route');

var Usuario = require('../models/Usuario');

/* retorna uma lista com todos os usuarios */
router.get('/', function(req, res, next) {
  try{
      session =req.session;
      if(session.user){
          Usuario.find({}, function(err, usuarios){
            if(err){
              console.log("USER ROUTE - ERROR - FIND USUARIO", err);
              return PadraoRoute.error(res, "Erro ao buscar os usuarios");
            }
            return PadraoRoute.sucess(res, usuarios);
          });
      }else{
          return PadraoRoute.unauthorized(res);
      }
      
  }catch(e){
    console.log("USER ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});

/* retorna uma lista com todos os usuarios de um determinado tipo */
router.get('/tipo/:tipo', function(req, res, next) {
  try{
    session =req.session;
    if(session.user){
      Usuario.find({tipo:req.params.tipo}, function(err, usuarios){
        if(err){
            console.log("USER ROUTE - ERROR - FIND USUARIO TIPO", err);
            return PadraoRoute.error(res, "Erro ao buscar os usuarios");
        }
        return PadraoRoute.sucess(res, usuarios);
      });
    }else{
        return PadraoRoute.unauthorized(res);
    }    
  }catch(e){
    console.log("USER ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});


// cria novo usuario
router.post('/novo', function(req, res, next){
  try{
    session = req.session;
    if(session.user){
      if(req.body){
        var novoUsuario = new Usuario();
        novoUsuario.email = req.body.email;
        novoUsuario.senha = req.body.senha;
        novoUsuario.nome = req.body.nome;
        novoUsuario.foto = req.body.foto;
        novoUsuario.tipo = req.body.tipo;
        
        var dataConvertida = new Date(req.body.dataNascimento);
      
        novoUsuario.dataNascimento = dataConvertida;

        novoUsuario.dataCriacao = new Date();

        novoUsuario.save(function(err, product, numAffected){
          if(err) {
            console.log("ERRO AO SALVAR USUARIO", err);
            return PadraoRoute.error(res, "Não foi possível salvar o usuario");
          }
          if(numAffected == 1){
            return PadraoRoute.sucess(res, "Usuário criado com sucesso!");  
          }
          return PadraoRoute.error(res, null);
        });

      }else{
        return PadraoRoute.error(res, "Usuario nao enviado!");
      }
    }else{
        return PadraoRoute.unauthorized(res);
    }
    
  }catch(e){
    console.log("USER ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});


/* É usado para retornar uma lista de profissionais que possuem esse email!
   O usuario ira escolher o que deseja e depois ira chamar o post
 */
router.get("/vincular", function(req, res, next){
  try{
    session = req.session;
    if(session.user){
      Usuario.find(
        {
          email:new RegExp('^'+ req.query.email+ '$', 'i'),
          tipo:1
        }, function(err, pacientes){
          if(err){
            console.log("ERRO: FIND VINCULAR", err);
            return PadraoRoute.error(res, "Não foi possível buscar os pacientes!");
          }
          console.log("PACIENTES",req.query.email, pacientes);
          if(pacientes != null && pacientes.length > 0){
            return PadraoRoute.sucess(res, pacientes);
          }
          console.log("ERRO: VINCULAR");
          return PadraoRoute.error(res, "Não existem pacientes com o email buscado");
      });
    }else{
        return PadraoRoute.unauthorized(res);
    }
    
  }catch(e){
    console.log("ERRO",e);
    return PadraoRoute.error(res, e);
  }
});

router.put("/", function(req, res, next){
  try{
    session = req.session;
    if(session.user){
      Usuario.findById(req.body._id, function(err, usuarios){
        if(err){
            console.log("USER ROUTE - ERROR - FIND USUARIO TIPO", err);
            return PadraoRoute.error(res, "Erro ao buscar os usuarios");
        }
        return PadraoRoute.sucess(res, usuarios);
      });
    }else{
       return PadraoRoute.unauthorized(res);
    }  
  }catch(e){
    console.log("USER ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});
module.exports = router;
