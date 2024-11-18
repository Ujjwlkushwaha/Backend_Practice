const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Lets Learn Error Handling</h1>');
})

/*
    ⭐ Error Handling middleware always defined in last or after the all middlewares and routes 


👍 Error Handling middleware

    app.use((err, req, res, next) => {

        // Handle the error here
        console.error(err);

        res.status(500).send('Something broke!');
                    or 
        next(err);  => forward to next error handler middleware

        ⭐ Error handler ka next hmesa issi tarah call hota hai 
    });

    // End of Error Handling middleware

*/



app.listen(3000 , (err)=>{
    if(err) console.error(err);
    console.log('Server is running on port 3000');
})