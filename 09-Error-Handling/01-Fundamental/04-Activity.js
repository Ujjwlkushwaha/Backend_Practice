const express = require('express')
const app = express()
const CustomErrors = require('./02.CustomError');

// get route
app.get('/' , (req , res)=>{
    res.status(200).send('Root is working')
})

app.get('/admin' , (req , res)=>{
    console.log('Forbidden Error');
    throw new CustomErrors(403 , 'Access to admin is forbidden')
    // forbidden error (403) :: Jab kahi jaane ki permission hmare paas nhi hoti hai and fir bhi hm usse access krne ki kosis krte hai.
})

//👺  custom error handler
app.use((err , req , res , next)=>{
    console.log("======== ERROR : 1 ========");
    const { status, message } = err;

    //➡️  we can send error message from here also.
    // res.status(status).send(message);
    //➡️This will call next error handler
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