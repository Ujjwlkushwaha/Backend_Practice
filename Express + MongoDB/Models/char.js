const mongoose = require('mongoose');


// creating schema of chats
const charSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    message : {
        type : String,
        maxLength : 50
    },
    created_at : {
        type : Date,
        required : true
    }
});

// and export as a model
module.exports = mongoose.model('Chat', charSchema);