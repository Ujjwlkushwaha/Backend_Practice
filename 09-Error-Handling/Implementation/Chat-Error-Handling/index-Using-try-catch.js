const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const CustomError = require("./CustomError.js");
let methodOverride = require("method-override");
app.use(methodOverride("_method"));

// ***************** Configuration *****************************************

// configuration of ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ***************** Middleware setup **********************************

//  �� middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ***************** DB-connection *****************************************

//  📌 creating connections to MongoDb
main()
  .then(() => {
    console.log("Connecting to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakeMassenger");
}

// ****************** Chat API's *****************************************

// 📌 Routing start here

// 📌📌 Home route
app.get("/", (req, res) => {
  res.send("root is working...");
});

// 📌📌 index route -> shows all chats
app.get("/chats", async (req, res, next) => {
  try {
    let allChats = await Chat.find();
    if (!allChats) {
      throw new CustomError("404", "Chats not found");
    }
    res.render("index", { chats: allChats });
  } catch (error) {
    next(error);
  }
});

// 📌📌 post route -> new chats
app.post("/chats", async (req, res, next) => {
  try {
    let { from, msg } = req.body;

    if (from === "") return res.send("Name is required");
    if (msg === "") return res.send("Message is required");

    let newChat = new Chat({
      from: from,
      to: "me",
      msg: msg,
    });

    // save new chat to the database
    await newChat.save();

    res.redirect("/chats");
  } catch (error) {
    next(error);
  }
});

//👺 show route -> new chat for Async Error
app.get("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      // in case chat is not found
      throw new CustomError(404, "Chat not found");
    }
    res.render("show", { chat });
  } catch (error) {
    next(error);
  }
});

// 📌📌 for edit route -> edit the chat
app.get("/chats/:id/edit", async (req, res, next) => {
  try {
    let chat = await Chat.findById(req.params.id);
    res.render("edit", { chat: chat });
  } catch (error) {
    next(error);
  }
});

app.patch("/chats/:id/edit", async (req, res) => {
  try {
    let { from, msg } = req.body;
    await Chat.findByIdAndUpdate(
      req.params.id,
      {
        from: from,
        msg: msg,
      },
      { new: true, runValidators: true }
    );

    res.redirect("/chats");
  } catch (error) {
    next(error);
  }
});

// 📌📌 Delete route
app.delete("/chats/:id", (req, res) => {
  try {
    Chat.findByIdAndDelete(req.params.id).then(() => res.redirect("/chats"));
  } catch (error) {
    next(error);
  }
});

// ----------------------ERROR Handlers --------------------------------

//Error handler
app.use((err, req, res, next) => {
  let { status = 500, message = "Some error Occurs" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
