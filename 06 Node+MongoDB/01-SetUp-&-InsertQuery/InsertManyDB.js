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
        minlength: 4,
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

// �� step 4: insert Multiple users at a time  -> this is the way of inserting multiple users at a time
User.insertMany([
    { name : 'John', email : 'John@example.com' , password : 'john' },
    { name : 'Jane', email : 'jane@example.com', password : 'jane' },
    { name : 'Admin', email : 'admin@example.com', password : 'admin', role: 'admin' },
    { name : 'Johny', email : 'johny@example.com', password :'Johny', role: 'admin'},
    // { name : 'Johny', email : 'johny@example.com', password :'Johny', role: 'admin'}
]).then((res)=>{
    console.log('Data Inserted Successfully');
}).catch((err)=>{
    console.error(err);
});