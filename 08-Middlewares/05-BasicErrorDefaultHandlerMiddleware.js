const express = require('express');
const app = express();

//  📌 Express default error handling middleware
/*
        ⚔️ Express comes with built-in error handlers that take care of any error that might be encountered in the app.
        ⚔️ This default error handling middleware function will added  at the end of the middleware function stack.

        👉 When an error is written, the following information is added to the response
            
            📌 the res.statusCode -> according to err.statusCode
            📌 the res.statusMessage -> according the statusCode
            📌 Any header specified in the err.header object
*/

//⭐  throw our own errors
const authenication = function(req , res , next){
    let {token} = req.query;
    const apiKey = 'thisIsTheKey';
    //📌  here query string works as password or key for the api
    if(token === apiKey){
        console.log('authentication successful');
        next();
    }else{
        // 👺 when we got an error so express by default handle errors and throw some res 
        console.log('authentication failed');

        // we got an error so we also can throw costom error
        throw new Error('Unauthorised access(404)') // and after this we got 

        /*
            Error: Unauthorised access(404)
                at authenication (D:\Streak\BackEnd\Middlewares\05-BasicErrorDefaultHandlerMiddleware.js:29:15)
                at Layer.handle [as handle_request] (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\layer.js:95:5)
                at next (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\route.js:149:13)
                at Route.dispatch (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\route.js:119:3)
                at Layer.handle [as handle_request] (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\layer.js:95:5)
                at D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\index.js:284:15
                at Function.process_params (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\index.js:346:12)
                at next (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\index.js:280:10)
                at expressInit (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\middleware\init.js:40:5)
                at Layer.handle [as handle_request] (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\layer.js:95:5)
        
        */


    }
};

// Rest Api's ---------------------------------------------

app.get('/' , function(req, res){
    res.send('<h1>Welcome to Home Route</h1>');
})

app.get('/wrongWay' , (req , res)=>{
    //📌  I am putting a random text that gives error 
    sdfsdsf = dfsdfsf

    //👉  lets see how the exprss handle it

    // 📌 ye error hai jo express ne show kiya haii with the status code 500
    /*
        # ⚔️ error message
        ReferenceError: dfsdfsf is not defined

        # 👉 error stack
                at 
                D:\Streak\BackEnd\Middlewares\05-BasicErrorDefaultHandlerMiddleware.js:39:5
                at Layer.handle [as handle_request] (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\layer.js:95:5)
                at next (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\route.js:149:13)
                at Route.dispatch (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\route.js:119:3)
                at Layer.handle [as handle_request] (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\layer.js:95:5)
                at D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\index.js:284:15
                at Function.process_params (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\index.js:346:12)
                at next (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\index.js:280:10)
                at expressInit (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\middleware\init.js:40:5)
                at Layer.handle [as handle_request] (D:\Streak\BackEnd\Middlewares\node_modules\express\lib\router\layer.js:95:5)
                
    */
})



// 📌 we can pass middleware also here -> yaha par bhi same hi work krega
app.get('/api', authenication , function(req, res){
    res.send('<h1>Welcome to API Route</h1>');
})

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
});