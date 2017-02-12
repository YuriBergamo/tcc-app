/**
 * Created by yuribergamo on 14/01/17.
 */

var mongoose = require('mongoose');
module.exports = {
    db: function() {
            //return mongoose.connect('mongodb://admin:adminadmin@ds159237.mlab.com:59237/tcc').connection;
            // mongoose.createConnection('localhost', 'apiDB', '21017');

            mongoose.connect('mongodb://localhost:27017/apiDB');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function() {
                // we're connected!
                console.log("DB OPEN");  
            });
            
        }
}
