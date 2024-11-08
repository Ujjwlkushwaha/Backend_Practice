# Introduction

In this Folder, We will study about mongoose library and how mongoDB works with Node.js.

### mongoose.js 

Mongoose is a library that makes connection between mongoDB database and Node.js

    npm install mongoose 

### Basic startUp code

    import mongoose from 'mongoose';

    // making connection to MongoDB

    mongoose.connect(mongoose://localhost:27017/testDB)
    .then(()=>{
        console.log('Connecting to MongoDB');
    })
    .catch(err =>{
        console.error(err);
    })
