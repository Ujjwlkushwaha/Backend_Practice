
const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello, Welcome to the server!'); 
  
});

//👻  handle get request ->📌 get req only accepts data in string format and size of get req data is limited 
app.get('/register', (req, res) => {
    res.send('Data is accepted by the server using get request');
      // 👺⭐ http://localhost:3000/register?username=ukeditz71%40gmail.com&password=1234\

    //📌📌  get res ka sara data query string me dikhta hia vo bhi ak dam saaf saaf sabdo me

    // 👺 itna aasan kaam hota hai get req se data niklnaa
    const data = req.query;
    console.log(data); // { username: 'ukeditz71%40gmail.com', password: '1234' }
});


//⭐  handle post request
app.post('/register', (req, res) => {
    res.send('Data is accepted by the server using post request');
    //⭐⭐  http://localhost:3000/register

    //👍  post request me data encoded form me req ki body ke sath aata hai jiise directly accesss nhi kiya ja saktaa

    // 👉 post request me data aese seedhe access nhi kar sakte
    const data = req.body;
    console.log(data); // undefined

    // body se data niklne ka kuchh tarika hota haii 
});

app.listen(port , ()=>{
    console.log('server is listening on port 3000');
});