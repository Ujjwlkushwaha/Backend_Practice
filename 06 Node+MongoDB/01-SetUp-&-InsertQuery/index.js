const mongoose = require('mongoose');

//  📌 step 1; create a connection
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
}

main()
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>console.error(err));



// 📌 step 2: Create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false // this field will not be returned in queries
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// strp 3 : create collection or model 
    const User = mongoose.model('User', userSchema);

// �� step 4: Create a new user  -> this is the way of inserting single user at a time
const user1 = new User({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123'
})

//  save the user permanently in the database
user1.save().then((data)=>{
    console.log("Data Saved successfully");
    console.log('Inserted data is : ' , data);
});