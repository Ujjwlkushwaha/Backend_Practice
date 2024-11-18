const express = require("express");
const app = express();
let mongoose = require("mongoose");
let User = require("./../models/Schema.js");
let path = require("path");
let CustomError = require("./../utils/CustomErrors.js");

// *********Connect to DB************

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// *********Configure View Engine************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// *********Parsers Middleware************
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *********Rest Api*****************

app.get("/", (req, res, next) => {
  try {
    res.render("form");
  } catch (error) {
    next(error);
  }
});
app.get("/register", (req, res, next) => {
  try {
    res.render("form");
  } catch (error) {
    next(error);
  }
});

function asyncWrapper(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

app.post(
  "/register",
  asyncWrapper(async (req, res, next) => {
    let { username, email, password } = req.body;
  
    //📌 validate schema using if-else....................

    if (!username || username.length < 3) {
      throw new CustomError(400 ,"Name should be at least 3 characters long");
    }
    if (!password || password.length < 8) {
      throw new CustomError(400 , "Name should be at least 3 characters long");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      throw new CustomError(400, "Email Required");
    } else if (!emailRegex.test(email) || email.length < 5) {
      throw new CustomError(400, "Invalid Email");
    }

    //............................................................

    // create a new user
    let user = new User({ username, email, password });
    console.log(user);
    await user.save();

    res.status(200).render('Success',{name: username, email: email});
  })
);



// *********Error Handler************
app.use("*", (req, res, next) => {
  let err = new CustomError( 404 , "Not Found");
  next(err);
});

app.use('/register' , (err, req, res, next) => {
  let { status, message, header } = err;
  console.log(status, message);
  res.status(status || 500).render('Error' , { message: message});
});

app.use((err, req, res, next) => {
  let { status, message = 'Something went wrong', header } = err;
  console.log(status, message);
  res.status(status || 500).send(message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
