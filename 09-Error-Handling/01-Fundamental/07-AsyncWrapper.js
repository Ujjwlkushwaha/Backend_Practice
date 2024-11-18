const express = require("express");
const app = express();
const CustomError = require("./02.CustomError");

//👉 In this syntax -> We dont need to use try catch statement again and again

//👉 just simply pass the async callback inside async wrapper and thats it;

//📌 asyncWrapper for wrapping async functions
function asyncWrapper(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
} // that it⚔️

app.get("/", (req, res) => {
  res.send(`
        <div>
            <h1>Lets Learn handle Async error <a href="/error">( /error )</a></h1>
            <li>Mostly async error thow by databases</li>
            <li>we can handle using try catch block </li>
        </div>
        `);
});

app.get(
  "/error",
  asyncWrapper(async (req, res, next) => {
    throw new CustomError(500, "This is async error");
  })
);

//📌 Handler for handle errors
app.use((err, req, res, next) => {
  let { status, message } = err;
  console.log("Error handle success fully");
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
