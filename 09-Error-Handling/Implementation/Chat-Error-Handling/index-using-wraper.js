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

// ******************Wraper Function************************

function asyncWraper(fn) {
  return function (req, res, next) {
      fn(req, res, next).catch(err => next(err))
}
}

// 📌📌 index route -> shows all chats
app.get(
  "/chats",
  asyncWraper(async (req, res, next) => {
    let allChats = await Chat.find();
    if (!allChats) {
      throw new CustomError("404", "Chats not found");
    }
    res.render("index", { chats: allChats });
  })
);

// 📌📌 post route -> new chats
app.post(
  "/chats",
  asyncWraper(async (req, res, next) => {
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
  })
);

//👺 show route -> new chat for Async Error
app.get(
  "/chats/:id",
  asyncWraper(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      // in case chat is not found
      throw new CustomError(404, "Chat not found");
    }
    res.render("show", { chat });
  })
);

// 📌📌 for edit route -> edit the chat
app.get(
  "/chats/:id/edit",
  asyncWraper(async (req, res, next) => {
    let chat = await Chat.findById(req.params.id);
    res.render("edit", { chat: chat });
  })
);

app.patch(
  "/chats/:id/edit",
  asyncWraper(async (req, res) => {
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
  })
);

// 📌📌 Delete route
app.delete(
  "/chats/:id",
  asyncWraper(async (req, res) => {
    await Chat.findByIdAndDelete(req.params.id).then(() =>
      res.redirect("/chats")
    );
  })
);

// ----------------------ERROR Handlers --------------------------------

//Error handler
app.use((err, req, res, next) => {
  let { status = 500, message = "Some error Occurs" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
