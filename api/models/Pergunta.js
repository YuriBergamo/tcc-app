var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var perguntaSchema = new Schema({
    pergunta:String,
    tipoResposta:String,
    respostaPossiveis:[String],
    dataCriacao:Date,
    obrigatoria:Boolean
});


var Pergunta = mongoose.model("Pergunta", perguntaSchema);

module.exports = Pergunta;