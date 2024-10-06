const express = require("express")
const path = require("path");
const app = express();
// genearting id's 
const { v4: newId } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// 👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍

// parse data into readable format 
app.use(express.urlencoded({ extended: true}));

// 📌 configuration of ejs
app.set( 'view engine' , "ejs" );
app.set( "views" , path.join(__dirname, "views"));

//📌  static files
app.use(express.static(path.join(__dirname , "public")));
app.use(express.static(path.join(__dirname , "public/Css/")));
app.use(express.static(path.join(__dirname , "public/Javascript/")));

// 👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍👍


let posts = [
    {
        id : newId(),
        username : "karan",
        content  : "Hello world from the cloud⛈️ " 
    },
    {
        id : newId(),
        username : "Jane Doe",
        content  : "I'm learning Node.js🖥️"
    },
    {
        id :newId(),
        username : "John Doe",
        content  : "I'm learning Express.js⭐⭐"
    }
    ,{
        id : newId(),
        username : "Emily Smith",
        content  : "I'm learning MongoDB👻"
    },
    {
        id : newId(),
        username : "David Johnson",
        content  : "I'm learning React.js🎉👺"
    }
];
//📌  routes 

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})

app.get('/posts', (req, res) => {
    res.render("index.ejs" , { posts })
})

// 👉 create new post -> ye do step me hoga

app.get('/posts/new', (req, res) => {
    res.render("createPost.ejs")
})

app.post('/posts', (req, res) => {
    let {username , content } = req.body;

    // this is the noraml way of creating id's for every data
    let id = newId(); 
    posts.push({ id , username , content}  );

    res.redirect("/posts")
})

app.listen(3000 , ()=>{
    console.log('server listening on port');
    
})

//  ⭐ find individual post 
app.get('/posts/:id', (req, res) =>{
    let {id} = req.params;

    let post = posts.find(p => p.id == id);
    res.render('showPost.ejs' ,{ post })
});