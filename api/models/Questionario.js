var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionarioSchema = new Schema({
    perguntas:[{type:Schema.Types.ObjectId, ref:'Pergunta', require:true}],
    ativo:Boolean,
    usuarioCriacao:{type:Schema.Types.ObjectId, ref:'Usuario', require:true},
    dataCriacao:Date
});

var Questionario = mongoose.model("Questionario", questionarioSchema);

module.exports = Questionario;