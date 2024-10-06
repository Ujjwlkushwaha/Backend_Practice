// server using HTTP module 
// const http = require('http');
import http from 'http';

// const fs = require('fs');
let port = 3000;
// const { log } = require('console');

const server = http.createServer((req , res)=>{
    console.log('request accepted');
});

server.listen(port , 'localhost' , (err)=>{
    console.log('server is listening..........');
});