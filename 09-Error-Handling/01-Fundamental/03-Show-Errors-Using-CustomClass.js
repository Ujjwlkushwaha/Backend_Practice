const express = require('express')
const app = express()
const CustomErrors = require('./02.CustomError');


//➡️  Authorization middleware
app.use('/api' , (req , res , next)=>{
    let {token} = req.query;
    const apiKey = 'thisIsTheKey';

    // here query string works as password or key for the api
    if(token === apiKey){
        next();
    } else{
        // 👺we thow the error from here 
        throw new CustomErrors(401 , 'Authentication failed');
    }
})

// get route
app.get('/' , (req , res)=>{
    res.send('<h1>Home is working</h1>')
})

app.get('/api' , (req, res)=>{
    res.send('<h1>API is working</h1>')
})

//➡️ custom error handler
app.use((err , req , res , next)=>{
    console.log("======== ERROR : 1 ========");
    const { status, message } = err;

    //➡️  we can send error message from here also.
    // res.status(status).send(message);
    
    
    // This will call next error handler
    next(err);
});

app.use((err , req , res , next)=>{
    console.log("===== ERROR : 2 with defaults ===");
    
    // 📌 Here we set default value => If in case we can not get any status or message 
    const { status = 500, message = 'Some Error Occurs' } = err;
    console.log(message);
    res.status(status).send(`<h1>${message}</h1>`);
});

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
});