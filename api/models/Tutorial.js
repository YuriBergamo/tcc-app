/**
 * Created by yuribergamo on 30/01/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tutorialSchema = new Schema({

    titulo: { type: String, required: true },
    item: { type: String, required: true },
    image: String,
    proximo: Boolean,
    voltar: Boolean,
    finalizar: Boolean
});

var Tutorial = mongoose.model('Tutorial', tutorialSchema);

// make this available to our users in our Node applications
module.exports = Tutorial;
