const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ✅ Db connection

mongoose.connect('mongodb://127.0.0.1:27017/Relationship')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
 
//✅ Create user schema
const userSchema = new Schema({
    username : String,
    
    //✅ Ye address schema hai inside user schema 
    address : [
        {
            _id : false,
            location :{
                type : String,
                required : true
            },
            city : String,
            pinCode : {
                type : Number,
                required : true
            }
        }
    ]
});

//✅ Create user model
const User = mongoose.model('User',userSchema);

let createUser = async()=>{
    let newUser = new User({
        username : 'Rajesh',
        address : [
            //✅  way : 1
            {
                location : 'Gurugram' ,
                city : "Dehli" ,
                pinCode : '345677'
            }
        ]
    });

    // ✅ way : 2
    newUser.address.push({location : "Jhinjhak" , city : "Kanpur" , pinCode : '345477'});
    let result = await newUser.save();
    console.log(result);
}

createUser();