const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat');

let methodOverride = require('method-override')
app.use(methodOverride('_method'))

// configuration of ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  �� middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//  📌 creating connections to MongoDb
main()
.then(()=>{
    console.log('Connecting to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/massenger');
}

// 📌 Routing start here

// 📌📌 Home route
app.get('/', (req, res) => {
    res.send('root is working...');
});

// 📌📌 index route -> shows all chats
app.get('/chats' , async (req ,res)=>{
    let allChats = await Chat.find();
    res.render('index', { chats : allChats });
})

// 📌📌 post route -> new chats
app.post('/chats',async (req , res)=>{
    let { from , msg } = req.body;
    
    let newChat = new Chat({
        from : from,
        to : 'me',
        msg : msg
    });
    
    // save new chat to the database
    await newChat.save();
    
    res.redirect('/chats');
})

//  📌📌 for edit route -> edit the chat

app.get('/chats/:id/edit', async (req, res) => {
    let chat = await Chat.findById(req.params.id);
    res.render('edit', { chat : chat });
});

app.patch('/chats/:id/edit' ,async (req , res)=>{
    let { from , msg } = req.body;
    await Chat.findByIdAndUpdate(req.params.id, {
        from : from,
        msg : msg
    }, { new : true ,runValidators: true});
    
    res.redirect('/chats');
})

// 📌⚔️ delete route 
app.delete('/chats/:id', (req , res)=>{

    Chat.findByIdAndDelete(req.params.id)
   .then(() => res.redirect('/chats'));
})

app.listen(8080 , () => {
    console.log('Server is running on port 8080');
})


