
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var agendaSchema = new Schema({

    dataAgenda: { type: Date, required: true },
    local:String,
    nivelUrgencia:String,
    observacao:String,
    profissional:{type:Schema.Types.ObjectId, ref:'Usuario', require:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario', require:true},
    tipo:{type:String, require:true},
    status:String,
    questionario:{type:Schema.Types.ObjectId, ref:'Questionario'}

});

var Agenda = mongoose.model('Agenda',agendaSchema);

// make this available to our users in our Node applications
module.exports = Agenda;
