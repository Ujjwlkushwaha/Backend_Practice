const fs = require('fs');

// learn json ..............

// create an object
let obj = {
    name : "ujjwal",
    serName : "Kushwaha",
    age : 20
};

// Convert into json
let intoJson = JSON.stringify(obj);

// storing json data 
fs.writeFile('text.json' , intoJson , (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Data is registered in file successfully");
});

// read json data
fs.readFile('text.json' , 'utf-8' , (err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(JSON.parse(data));
});




