const express = require("express");
const app = express();
let mongoose = require("mongoose");
let User = require("./../models/Schema.js");
let path = require("path");
let CustomError = require("./../utils/CustomErrors.js");
let validator = require("./SchemaValidation.js");

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

// validate function middleware
function valueVerification(req, res, next) {
  console.log(req.body);
  let { error } = validator.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((detail) => detail.message).join(", ");
    throw new CustomError(400, errorMsg);
  } else {
    next();
  }
}

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

// pass validate function as a middleware
app.post(
  "/register",
  valueVerification,
  asyncWrapper(async (req, res, next) => {
    let { username, email, password } = req.body;
    // create a new user
    let user = new User({ username, email, password });
    await user.save();
    res.status(200).render("Success", { name: username, email: email });
  })
);

// *********Error Handler************
app.use("*", (req, res, next) => {
  let err = new CustomError(404, "Not Found");
  next(err);
});

app.use("/register", (err, req, res, next) => {
  let { status = 500, message = "Got some technical err" } = err;
  res.status(status).render('Error',{message});
});

app.use((err, req, res, next) => {
  // let { status=500, message = 'Something went wrong'} = err;
  // console.log(status, message);
  // res.status(status || 500).send(message);
  res.send("Got err");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
