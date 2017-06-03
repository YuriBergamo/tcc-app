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
    if(req.body){
      //TODO colocar teste para verificar email já cadastrado
      var novoUsuario = new Usuario();
      novoUsuario.email = req.body.email;
      novoUsuario.senha = req.body.senha;
      novoUsuario.nome = req.body.nome;
      novoUsuario.foto = req.body.foto;
      novoUsuario.tipo = req.body.tipo;
      
      //var dataConvertida = new Date(req.body.dataNascimento);
    
      novoUsuario.dataNascimento = new Date();

      novoUsuario.dataCriacao = new Date();
      novoUsuario.ativo= true;

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
  }catch(e){
    console.log("USER ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});


/* É usado para retornar uma lista de profissionais que possuem esse email!
   O usuario ira escolher o que deseja e depois ira chamar o post
 */
router.get("/buscarProfissional", function(req, res, next){
  try{        
    Usuario.find(
      {
        email:new RegExp('^'+ req.query.email+ '$', 'i'),
        tipo:1,
        ativo:true
      }, function(err, profissionais){
        if(err){
          console.log("ERRO: FIND VINCULAR", err);
          return PadraoRoute.error(res, "Não foi possível buscar os pacientes!");
        }
        return PadraoRoute.sucess(res, profissionais);                
    });    
    
  }catch(e){
    console.log("ERRO",e);
    return PadraoRoute.error(res, e);
  }
});

router.post("/vincularProfissional", function(req, res, next){
  try{
    Usuario.findById({'_id':req.body.idUsuario}, function(err, usuario){
        if(usuario){
          //vincular id
          //retornar a busca com o populate
          usuario.profissional = req.body.idProfissional;
          usuario.save(function(err, product, numAffected){
            if(err) return PadraoRoute.error(res, "Erro ao buscar usuario vinculado!");
            
            Usuario.findById({
                _id:usuario._id
              })
              .populate('profissional')
              .exec(function(err, usuarioComProfissional){
                  if(err){
                    return PadraoRoute.error(res, "Erro ao buscar usuario vinculado!");
                  }
                  if(usuarioComProfissional){
                      console.log("VINCULAR PROFISSIONAL OK!");
                      return PadraoRoute.sucess(res, usuarioComProfissional);                  
                  }
              });
          });
          
        }else{
          return PadraoRoute.error(res, "Erro ao vincular profissional!");
        }                    
    });     
    
  }catch(e){
    console.log("ERRO",e);
    return PadraoRoute.error(res, e);
  }
});

router.post("/desvincularProfissional", function(req, res, next){
  try{
    Usuario.findById({'_id':req.body.idUsuario}, function(err, usuario){
        if(usuario){
          //vincular id
          //retornar a busca com o populate
          usuario.profissional = null;
          usuario.save(function(err, product, numAffected){
            if(err) return PadraoRoute.error(res, "Erro ao buscar usuario desvincular!");
            
            Usuario.findById({
                _id:usuario._id
              })              
              .exec(function(err, usuarioDesvinculado){
                  if(err){
                    return PadraoRoute.error(res, "Erro ao buscar usuario desvinculado!");
                  }
                  if(usuarioDesvinculado){
                      console.log("DESVINCULAR PROFISSIONAL OK!");
                      return PadraoRoute.sucess(res, usuarioDesvinculado);                  
                  }
              });
          });
          
        }else{
          return PadraoRoute.error(res, "Erro ao desvincular profissional!");
        }                    
    });     
    
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

router.post("/buscar/session", function(req, res, next){
  try{
    console.log("SESSION!");
    session = req.session;
    if(session.user){
      Usuario.findOne({
          email:session.user
        })
        .populate('profissional')
        .exec(function(err, usuarioComProfissional){
            if(err){
              return PadraoRoute.error(res, "Erro ao buscar usuario logado!");
            }
            if(usuarioComProfissional){
                return PadraoRoute.sucess(res, usuarioComProfissional);                  
            }
      });
    }                                         
  }catch(e){
    console.log("ERRO",e);
    return PadraoRoute.error(res, e);
  }
});

module.exports = router;
