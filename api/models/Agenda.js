
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var agendaSchema = new Schema({

    data: { type: Date, required: true },    
    hora:String,
    /**
     * 1 - ALTO
     * 2 - MEDIO
     * 3 - NORMAL 
     * 4 - BAIXO
     */
    nivelUrgencia:String,
    observacao:String,
    profissional:{type:Schema.Types.ObjectId, ref:'Usuario', require:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario', require:true},
    tipo:{type:String, require:true},
    /**
     *  NENHUM (APOS CRIADO)
     *  ACEITO
     *  RESPONDIDO
     *  REJEITADO
     */
    status:String,
    questionario:{type:Schema.Types.ObjectId, ref:'Questionario'}

});

var Agenda = mongoose.model('Agenda',agendaSchema);

// make this available to our users in our Node applications
module.exports = Agenda;
