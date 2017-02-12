var express = require('express');
var router = express.Router();


var padrao = {
    "error": function(res, mensagem){
        if(mensagem) return res.json({status:400, data:mensagem});
        return res.json({status:500, data:"Erro na geral de conexao!"});
    },
    "sucess":function(res, data){
        return res.json({status:200, data:data});
    },
    "unauthorized": function(res){
        return res.json({status:404, data:"Não autorizado!"});
    }
}

module.exports = padrao;