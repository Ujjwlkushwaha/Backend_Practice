// ⭐/import express module first                   
const express = require('express'); 
const app = express(); 
//⭐  now the app variable can create routs and manage middlewares


/*
        👻 Middleware :: req handle hone se pahle or res send krne ke baad  server ko agar kuchh processing
                             karni hai to vaha middlewares ka use krta haii

            📌 Middleware ak aese functions hote hai jo kisi bhi routes ke pahle execute hote hai
            📌 Middleware ko hme aage push bhi krna hota hai for jump into next middleware


            example :: User ne kuchh request kra server se to route ka kaam hai kai response dena but
                        usse pahle user ko identify bhi to krna pdega ki hai kon ye.

                        iss type ki setuation me hm middleware ka user krte hai

                        👻Middleware ne check kiya ki user loggedIn hai ya nhii uske hisaab se vo routes ko req forward krega

*/

//👉👉 middleware  (⭐🎉     Sabse pahle ye chalegaa)  
app.use(function(req, res, next){ 
    // �� middleware function to check if user is logged in
    console.log('A user is accessing the server');

    // 📌 this is complesury it forwords the control to next middleware or route   
    next();
    // 👻👻 agar ye nhi lgaya to server yhi aage controll nhi bejegaa
});

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

// 📌📌 At the end you have to start the server
app.listen(3000);