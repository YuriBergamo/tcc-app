/**
 * Created by yuribergamo on 14/01/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var usuarioSchema = new Schema({

    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    tipo : { type: Number, require:true},
    dataNascimento: {type:Date, require:true},
    ativo:{type:Boolean, require: true},
    dataCriacao: Date,
    dataAlteracao:Date,
    foto:String,
    numeroSOS:String,
    emailSOS:String,
    diasSemanaSOS:[String],
    profissional:String,
    endereco:String

});

var Usuario = mongoose.model('Usuario',usuarioSchema);

// make this available to our users in our Node applications
module.exports = Usuario;
