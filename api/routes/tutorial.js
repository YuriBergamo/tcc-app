/**
 * Created by yuribergamo on 30/01/17.
 */
var express = require('express');
var router = express.Router();

var Tutorial = require('../models/Tutorial');

/* GET tutorial listing. */
router.get('/', function(req, res, next) {
    Tutorial.find({}, function (err, tutorials) {
        if(err) console.log("ERR", err);
        console.log("DEU CERTO", tutorials);
        return res.json({ status: 200, data: tutorials});
    });
});



router.post('/', function (req, res, next) {

    var tuto = new Tutorial({
        titulo:"Segundo Tutorial",
        item:"2",
        proximo:true,
        voltar:true,
        finalizar:false
    });

    tuto.save(function (err) {
        if(err) throw err;
        console.log("DEU CERTO CRIAR UM TUTORIAL")
    })

})
module.exports = router;
