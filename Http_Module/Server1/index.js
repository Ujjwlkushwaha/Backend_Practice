// server using HTTP module 
const http = require('http');
const fs = require('fs');
let port = 3000;
const { log } = require('console');

const server = http.createServer((req , res)=>{
    console.log('request accepted');

    let path = 'views/'
    switch(req.url){
        case '/':
            res.writeHead(200,'OK',{'Content-Type': 'text/html'});
            path += 'index.html';
            break;
        case '/contect':
            res.writeHead(200,'OK',{'Content-Type': 'text/html'});
            path += 'contect.html';
            break;
        default:
            res.writeHead(404,'Not Found',{'Content-Type': 'text/html'});
            path += '404.html';
            break;
    }

    // sending html file......................
    fs.readFile(path, 'utf-8', (err,data)=>{
        if(err){
            console.log(err);
            res.end();
            return;
        }else{
            res.write(data);
            res.end();
        }
    });
});

server.listen(port , 'localhost' , (err)=>{
    console.log('server is listening..........');
});