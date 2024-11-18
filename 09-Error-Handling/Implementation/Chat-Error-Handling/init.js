// initialize database with some random sample data
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

//  📌 creating connections to MongoDb
main()
.then(()=>{
    console.log('Connecting to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeMassenger');
}

//  �� creating sample chats
const sampleChat = [
    {
        from : 'John',
        to : 'Alice',
        msg : 'Hello Alice!'
    },
    {
        from : 'Alice',
        to : 'John',
        msg : 'Hi John!'
    },
    {
        from : 'Alice',
        to : 'Bob',
        msg : 'How are you Bob?'
    },
    {
        from : 'Bob',
        to : 'Alice',
        msg : 'I am good, thank you!'
    },{
        from : 'John',
        to : 'Bob',
        msg : 'What about you?'
    },
    {
        from : 'Bob',
        to : 'John',
        msg : 'I am also good, thank you!'
    },
    {
        from : 'John',
        to : 'Alice',
        msg : 'I am excited to see you again!'
    },
    {
        from : 'Alice',
        to : 'John',
        msg : 'I am glad to see you too!'
    }
];

//  �� inserting sample chats into the database
Chat.insertMany(sampleChat);