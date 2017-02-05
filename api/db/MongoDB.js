/**
 * Created by yuribergamo on 14/01/17.
 */
/*
const MongoClient = require('mongodb').MongoClient;
var _db;
module.exports = {

    conect: function(callback){
        MongoClient.connect('mongodb://admin:adminadmin@ds159237.mlab.com:59237/tcc', (err, database) => {
            //start server
            _db = database;
            return callback(err);
        });
    },

    db: function(){
        return _db;
    }

}
*/

var mongoose = require('mongoose');
module.exports = {
    db: function() {
            return mongoose.connect('mongodb://admin:adminadmin@ds159237.mlab.com:59237/tcc').connection;
        }
}
