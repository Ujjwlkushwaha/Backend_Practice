const express = require('express');
const app = express();
const user = require('./routes/user.js');
const posts = require('./routes/posts.js');

//✅ Importing routes -> we have saperate all the similer routes
app.use('/users', user); // please remove users from /users in user.js
app.use('/posts',posts); // please remove posts from /posts in posts.js


app.get('/', (req, res) => {
    res.send('<h1>Lets Learn Express-router()</h1>');
})

app.listen(3000 , ()=>{
    console.log('listening on port 3000')
})