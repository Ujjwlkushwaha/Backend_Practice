// In node js fs-mpdule is an in-built file system module
const fs = require('fs');

// 👍👍  fs.writeFile('path' , 'Data' , (err)=>{})  this method is used to create newFile or overwrite any file
fs.writeFile('Hay.txt' , 'Hay this is Fs module of Node js' , (err)=>{
    if(err) console.error(err)
    else
    console.log("Done");
})


//📌📌 append method is used to append some data into the file 
fs.appendFile('Hay.txt' , '\nThis is Another method of fs module' , (err)=>{
    if(err){
        console.error(err)
    }else{
        console.log("Done again");
    }
})


// 📌📌 
fs.readFile('Hay.txt' , (err , data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data.toString());
    }
})


// 📌📌 use to rename the file
fs.rename('Hay.txt' , 'Hello.txt' , (err)=>{
    if(err)console.error(err);
    else 
    console.log("File renamed");
})

//📌📌 used to delete the file
fs.unlink('Hello.txt' , (err)=>{
    if(err) console.log(err);
    else
    console.log("Delete file successfully");
})
