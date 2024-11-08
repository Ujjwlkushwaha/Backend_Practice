// ⭐/import express module first 
                    
const express = require('express'); //📌 this line is import the express module and create an instance

// ���/create an instance of express
const app = express(); //�� this line is create an instance of express
//⭐  now the app variable can create routs and manage middlewares

// user can requested to server for some information 
app.get('/', function(req , res){ // 📌  get method is used when user requests something and server have to respond something
    res
    .status(200) // send status code that indicate success of the request 
    .send(`
        <div>
            <h1 style=text-align:center;>Server using Express.js</h1>
            <p style=text-align:center>This is my first server created using Express.js</p>
        </div>
        `); // send a response to the client
})

app.get('/contact', function(req, res){
    res.status(404).send('Sorry! we cant find something'); 
});

// you can create multiple middlewares or request handlers

// 📌📌 At the end you have to start the server
app.listen(3000, function(){ // 📌  start listening on port 3000
    console.log('Server is running on port 3000'); // log a message when server is running
})