const express = require('express');
const app = express();
const port = 8080;

/*
    🎉👻📌 Handling POST requests -> 

                      1️⃣  Used for Creating / Writing / Updating data in the database 

                      2️⃣  With help of post request we can send any type of data to the server 

                      3️⃣ Hme sabse pahle uss encode data ko parse krna pdega readable format me

                          📌  uske liye 2 middle ware use hote hai jo pahle data ko decrypt krte hai and the ise readable format me change krte hai

                        👉 app.use(express.urlencoded({extended: true})); 👍 ye power dega express ko decode kreke samjhne ki
                        👉 app.use(express.json()); 👍 ye power dega express ko json format me parse krte hai

                      4️⃣  Body-parser middleware is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API endpoint

app.get('/' , (req, res) => {
    res.send('Hello from the backend');
})

app.post('/register', (req, res) => {
    console.log(req.body);  // This will print the incoming request body in the console
    const {user , password} = req.body;
    res.send(`<h1>Hay👋, ${user}👻, Welcome to the world of backend🎉</h1>`);
});

app.listen(port , ()=>console.log('listening on port'));


