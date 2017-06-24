var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var respostaQuestionarioSchema = new Schema({
    respostas:[],
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario'},    
    questionario:{type:Schema.Types.ObjectId, ref:'Questionario'},
    dataResposta:Date,
    agenda:{type:Schema.Types.ObjectId, ref:'Agenda'}
});

var RespostaQuestionario = mongoose.model("RespostaQuestionario", respostaQuestionarioSchema);

module.exports = RespostaQuestionario;