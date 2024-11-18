const express = require('express');
const app = express();

// authorization middleware

app.use('/api' ,function(req , res , next){
    let {token} = req.query;
    console.log(token);

    const apiKey = 'thisIsTheKey';
    //📌  here query string works as password or key for the api
    if(token === apiKey){
        next();
    }else{
        res.status(401).send('<h1>Unauthorised access(404)</h1>');
    }
})

// Rest Api's ---------------------------------------------

app.get('/' , function(req, res){
    res.send('<h1>Welcome to Home Route</h1>');
})

// 📌 jan authentication successful ho jayega tak req yaha pe aayegi
app.get('/api', function(req, res){
    res.send('<h1>Welcome to API Route</h1>');
})

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
});