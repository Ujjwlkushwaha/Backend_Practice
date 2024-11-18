let express = require('express');
let app = express();


// 📌📌 Middleware : middleware are the fuctions that execute when req comes;
// 📌 middleware can read the request object and can send req but mostly middleware ka res bhjna nhi hota hai
// 📌 Middleware ka kaam req ke resolve hone se pahle kuchh kaam krwana and fir usse next middleware ko forword krna hai.

// basic middleware =>⭐ execute first then other route
app.use(function(req, res, next) // => jab hm aese middleware bnate hai to ye har req ke liye execute hote haii 
{
    //⚔️ koi kaam jo req ke resolve hone se pahle krwana ho
    console.log('This is a basic middleware');

    //👉forword the controll to the next middleware
    next();
});

app.use(function(req, res, next){
    console.log('This is another middleware');
    
     //👉forword the controll to the next middleware
    next();
})

// 📌📌 these are routes for resolving the req and send res
app.get('/', function(req, res) // => execute after the middleware
{
    console.log('req is resolved!');

    //📌 this command send responce back to the client
    res.send('Hello World!');
});

app.listen(3000, function()
{
    console.log('Server is running on port 3000');
});