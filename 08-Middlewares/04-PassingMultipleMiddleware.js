const express = require('express');
const app = express();

// authorization middleware
const authenication = function(req , res , next){
    let {token} = req.query;
    const apiKey = 'thisIsTheKey';
    //📌  here query string works as password or key for the api
    if(token === apiKey){
        console.log('authentication successful');
        next();
    }else{
        console.log('authentication failed');
        res.status(401).send('<h1>Unauthorised access(404)</h1>');
    }
};

// Rest Api's ---------------------------------------------

app.get('/' , function(req, res){
    res.send('<h1>Welcome to Home Route</h1>');
})

// 📌 we can pass middleware also here -> yaha par bhi same hi work krega
app.get('/api', authenication , function(req, res){
    res.send('<h1>Welcome to API Route</h1>');
})

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
});