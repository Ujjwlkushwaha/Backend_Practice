const express = require('express');
const app = express();
const CustomError = require('./02.CustomError')

// most of the time async function generates async errors


app.get('/', (req, res) => {
    res.send(`
        <div>
            <h1>Lets Learn handle Async error <a href="/error">( /error )</a></h1>
            <li>Mostly async error thow by databases</li>
            <li>we can handle using try catch block </li>
        </div>
        `)
})
app.get('/error', async (req, res,next) => {
    try {
        throw new CustomError(500 ,'This is async error');
    } catch (error) {
        next(error);
    }
});

// Handler for handle errors
app.use((err , req , res , next)=>{
    let { status , message } = err;
    console.log('Error handle success fully');
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});