/**
 * Created by yuribergamo on 12/02/2017.
 */
var express = require('express');
var router = express.Router();

var Noticia = require('../models/Noticia');
var PadraoRoute = require('../routes/padrao_route');

router.get('/', function(req, res, next) {
    try {
        session = req.session;
        if(session.user){
            Noticia.find(function(error, noticias){
                if(noticias){
                    return PadraoRoute.sucess(res, noticias);
                }

                return PadraoRoute.error(res, "Não existem noticias!");
            });
        }else{
            return PadraoRoute.unauthorized(res);
        }
    } catch (e) {
        console.log("NEWS ROUTE - ERROR - EXCEPTION", e);
        return PadraoRoute.error(res, null);
    }    
    
});



// cria nova noticia
router.post('/', function(req, res, next){
  try{
    session = req.session;
    //somente cria noticias os profissionais
    if(session.user && session.tipo == 1){
        var novaNoticia = new Noticia();
        novaNoticia = req.body;
        novaNoticia.save(function(err, product, numAffected){
            if(err) {
            console.log("ERRO AO SALVAR NOTICIA", err);
            return PadraoRoute.error(res, "Não foi possível criar a noticia");
            }
            if(numAffected == 1){
            return PadraoRoute.sucess(res, "Notícia criada com sucesso!");  
            }
            return PadraoRoute.error(res, null);
        });
      
   }else{
        return PadraoRoute.unauthorized(res);
    }
    
  }catch(e){
    console.log("NEWS ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});

module.exports = router;
