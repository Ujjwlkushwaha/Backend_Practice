// server using HTTP module 
const http = require('http');
const fs = require('fs');
let port = 3000;
const { log } = require('console');

const server = http.createServer((req , res)=>{
    console.log('request accepted');

    // if i want to send some response to the client 
    // => there are three step and we must follow these steps

    // step => 1 set the header of the response....... res.writeHead(status code , "status massege" , {Content_Type});
    res.writeHead(200,'OK',{'Content-Type': 'text/html'});

    // step => 2 :: write the messege using........... write("you send anyThing")........ methods
    res.write("<h1>This is Home page</h1>");

    // step => 3 :: end the response body .............end()...........
    res.end();

});

server.listen(port , 'localhost' , (err)=>{
    console.log('server is listening..........');
});