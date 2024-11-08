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

//-------------------------Getting Data based on query----------------------------------------

User.findOne({name : 'John'})
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });

/*
Connected to MongoDB
    {
        _id: new ObjectId('67189942949c0e2028f93675'),
        name: 'John',
        email: 'John@example.com',
        role: 'user',
        created_at: 2024-10-23T06:35:46.980Z,
        __v: 0
    }

*/

//------------------------- Getting data By Id ----------------------------------------

User.findById('67189942949c0e2028f93675')
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });

  /*
    Connected to MongoDB
        {
            _id: new ObjectId('67189942949c0e2028f93675'),
            name: 'John',
            email: 'John@example.com',
            role: 'user',
            created_at: 2024-10-23T06:35:46.980Z,
            __v: 0
        }
  */