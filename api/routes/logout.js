
var express = require('express');
var router = express.Router();
var PadraoRoute= require('./padrao_route');

// logout usuario
router.post('/', function(req, res, next){
  try{
      req.session.destroy(function(err) {
        if(err) {
            console.log("LOGOUT ROUT - ERROR - DESTROY SESSION", err);
        } 
        return PadraoRoute.sucess(res, "Logout realizado com sucesso!");
      });
  }catch(e){
    console.log("LOGIN ROUTE - ERROR - EXCEPTION", e);
    return PadraoRoute.error(res, null);
  }
});


module.exports = router;

