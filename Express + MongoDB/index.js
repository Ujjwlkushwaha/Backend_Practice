const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;



// step👍 1 ::  Connect to MongoDB
async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

connect()
  .then(() => console.log("connection established"))
  .catch((err) => console.error(err));



//👍  step ::  2  setUp middleware function 
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

// ---------------------------------------------------------------------------------------------
    //🗡️  Routing 
    app.get('/', (req , res )=>{
        res.render("Home.ejs");
    });

// 📌 listening app 
app.listen(port ,(err) => {
    if(err) throw err;
    console.log(`Server started at port ${port}`);
});