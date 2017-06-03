var mongoose = require('mongoose');
var Usuario = require('./Usuario');
var Schema = mongoose.Schema;

var questionarioSchema = new Schema({
    perguntas:[],
    ativo:Boolean,
    nome:String,
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario'},
    dataCriacao:Date
});

var Questionario = mongoose.model("Questionario", questionarioSchema);

module.exports = Questionario;