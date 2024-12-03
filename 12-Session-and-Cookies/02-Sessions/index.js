const express = require('express');
const app = express();
const session = require('express-session');
// ===== Cookie-Parser middleware ==================
const cookieParser = require('cookie-parser');
app.use(cookieParser('password'));

app.use(session({secret:"password"}));

// ===== Routes ==================

app.get('/', (req, res) => {
    res.send('<h1>Test session successfull </h1>');
})

app.get('/test', (req, res) => {
    // setting a session variable
    req.session.username = 'John Doe';
    res.send('<h1>Hello, '+req.session.username+'</h1>');
})


app.listen(3000 , ()=>{
    console.log('server listening on port 3000');
});