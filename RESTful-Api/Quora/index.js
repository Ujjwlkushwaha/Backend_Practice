const express = require("express")
const path = require("path");
const app = express();


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
        id : 1,
        username : "karan",
        content  : "Hello world from the cloud⛈️ " 
    },
    {
        id : 2,
        username : "Jane Doe",
        content  : "I'm learning Node.js🖥️"
    },
    {
        id :3,
        username : "John Doe",
        content  : "I'm learning Express.js⭐⭐"
    }
    ,{
        id : 4,
        username : "Emily Smith",
        content  : "I'm learning MongoDB👻"
    },
    {
        id : 5,
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
    let id =  posts.length + 1; 
    posts.push({ id , username , content}  );


    // But in practical scenarios , we should use hash id instead of noramal id's 

        // 👍for generate unique id we use a package called UUID -> npm i uuid 
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