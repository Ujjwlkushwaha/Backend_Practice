const express = require("express")
const path = require("path");
const app = express();
// genearting id's 
const { v4: newId } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

 // overide the HTTP request method
 var methodOverride = require('method-override')
 app.use(methodOverride('_method'))


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


//📌  routes------------------------------------------ 
app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})
// --------------------------------------------------

// show all posts ------------------------------------
app.get('/posts', (req, res) => {
    res.render("index.ejs" , { posts })
})
// -------------------------------------------------

// // show individual post
// app.get('/posts/:id', (req, res) =>{
//     let {id} = req.params;
//     let post = posts.find(p => p.id == id);
//     res.render('showPost.ejs' ,{ post })
// });
// // 🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️

// 👉 create new post -> ye do step me hoga
app.get('/posts/new', (req, res) => {
    console.log('request granted')
    res.render('create.ejs');
})

app.post('/posts', (req, res) => {
    let {username , content } = req.body;

    // this is the noraml way of creating id's for every data
    let id = newId(); 
    posts.push({ id , username , content});

    res.redirect("/posts")
})

//👋 Patch request for updating data

app.get('/posts/:id/edit', (req, res) => {
    let {id} = req.params;
    let post = posts.find(p => p.id == id);
    res.render('edit.ejs' , { post })
})

app.patch('/posts/:id', (req, res) => {
    // res.send('patch request working')

    let {id} = req.params;
    let post = posts.find(p => p.id == id);

    let newContent  = req.body.content;
    post.content = newContent;
    
    res.redirect(`/posts`)
}) 

app.delete('/posts/:id', (req, res) => {
    let {id} = req.params ;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts')
})

app.listen(3000 , ()=>{
    console.log('server listening on port');
    
})
