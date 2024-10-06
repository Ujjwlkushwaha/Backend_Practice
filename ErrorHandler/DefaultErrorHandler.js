// ⭐/import express module first                   
const express = require('express'); 
const app = express(); 
//⭐  now the app variable can create routs and manage middlewares


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

app.get('/contact', function(req, res , next){
    // 📌 this error is showing in console screen
    return next(new Error('Something went wrong'));
});

/*
    we are talking about basic error handling

    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    
    // this middleware will be executed when any error occurs in the server
    // it will log the error stack to the console and send a 500 status code back to the client
    // this will help you to debug the issue easily in your local environment
    // but in production environment you should not display stack traces to the user as it can expose sensitive information about your application and system.

*/

//🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️🗡️ 
app.use(function(err , req , res, next){
    console.error(err.stack);
    res.status(500).send('Something went wrong , i have no idea!!👻👻 ')
})

// 📌📌 At the end you have to start the server
app.listen(3000);