const express = require('express');
const app = express();

// ===== Normal Routes ==================

app.get('/', (req, res) => {
    res.send('<h1>Lets Learn Error Handling</h1>');
})

app.get('/wrong' , (req , res)=>{
    // 👺 this line may give error 
    abcd = abcd;
})

// ===== Error Handler middleware ==================

// 🗡️ Our error handler middleware
app.use((err, req, res, next) => {
    console.log("======== ERROR : 1 ========");
    console.error(err.stack);
    
    res.status(500).send('Something broke!'); // �� this will send a 500 status code with error message
})

app.listen(3000 , (err)=>{
    if(err) console.error(err);
    console.log('Server is running on port 3000');
})