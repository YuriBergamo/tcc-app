var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var perguntaSchema = new Schema({
    pergunta:String,
    tipoResposta:String,
    respostaPossiveis:[String],    
    obrigatoria:Boolean,
    ordem:Number
});


var Pergunta = mongoose.model("Pergunta", perguntaSchema);

module.exports = Pergunta;