/**
 * Created by yuribergamo on 14/01/17.
 */

var mongoose = require('mongoose');
module.exports = {
    db: function() {
            mongoose.connect('mongodb://localhost:27017/apiDB');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function() {
                // we're connected!
                console.log("DB OPEN");  
            });
            
        }
}
