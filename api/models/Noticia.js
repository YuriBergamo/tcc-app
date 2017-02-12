
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var noticiaSchema = new Schema({

    titulo: { type: String, required: true },
    descricao:String,
    imagem:String
});

var Noticia = mongoose.model('Noticia',noticiaSchema);

// make this available to our users in our Node applications
module.exports = Noticia;
