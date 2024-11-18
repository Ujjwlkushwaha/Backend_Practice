// creating sceama of chat 
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    msg : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

// exporting the schema to be used elsewhere in the application
module.exports = mongoose.model('Chat', chatSchema);