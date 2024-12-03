const express = require('express');
const app = express();

// ===== Cookie-Parser middleware ==================
const cookieParser = require('cookie-parser');

app.use(cookieParser('password'));


// ===== Normal Routes ==================

app.get('/', (req, res) => {
    res.send('<h1>Lets Learn about Cookies🍪🥠</h1>');
})

//✅ Sending cookies as a response
app.get('/sendCookies', (req, res) => {
    res.cookie('myCookie', 'This is a normal cookie ').send('Cookies are sent successfully');
    // res.cookie('myCookie', 'This is a signed cookie' , {signed:true}).send('signedCookies are sent successfully');
});

//✅  Recieving cookies 
app.get('/getCookies', (req, res) => {
    console.log(req.cookies);
    // console.log(req.signedCookies);
    res.send('Cookies received successfully');
});

app.listen(3000 , ()=>{
    console.log('server listening on port 3000');
});