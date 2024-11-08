
const mongoose = require("mongoose");

//  📌 step 1; create a connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/users");
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

// 📌 step 2: Create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
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
    select: false, // this field will not be returned in queries
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

console.log("before updating user");
User.find({ name : 'Johny'}).then(function(d){console.log(d)});


//-------------------------Update Query----------------------------------------

// syntax : User.updateOne('<filter>' , '<Updated value>')


//📌  update user role to 'user' for the user with email 'johny@example.com'   
User.updateMany(
        {role : 'admin'},
        {role : 'user'}
    )
    .then((res) => {
        console.log('User role updated successfully', res);
    })
    .catch(err => console.error(err));

console.log('User role updated successfully');
User.find({ name : 'Johny'}).then(function(d){console.log(d)});

