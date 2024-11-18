
const express = require('express');
const app = express();

// 📌logger middleware :: same work -> morgan middleware library
app.use((req , res, next)=>{

    // logging all details of req object
    console.log(req.hostname, req.path , req.method);
    next();

    // ⭐ this middlware is executed for every request 
})

// ⭐⭐ if we want to create a middleware that will execute for specific request
app.use('/random',(req , res, next)=>{
    console.log('Random middleware is executed');
    next();

    //📌 ye middleware tabhi execute hoga jab koi random /random par request krega
});
//..........................................................................
// routes
app.get('/', (req, res) => {
    res.send('Welcome to Root');
})

app.get('/random', (req, res) => {
    res.send('hi, I am random');
})
//...........................................................................

// 👺👺 agar koi bhi galat route daal deta hai to aese cases me hme usse 404 page show krne ki jarurat hai 

// 📌📌Error handling middleware 
app.use((req, res) => {
    res.status(404).send('<H1>NOT FOUND</H1>');
})
// � this middleware is executed for every request in case of any error

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
});