import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";
import mongoose from "mongoose";
const url = "mongodb://127.0.0.1:27017/node-mongo-hw";
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var port = process.env.PORT || 8080;

var router = express.Router();

// The method of the root url. Be friendly and welcome our user :)
app.get("/", (req, res) => {
  res.send(
    `<p>Welcome to the APOD app.<br>Routes:<br><p><ul><li>/yesterday: gives you APOD from a day ago</li><li>/update: update APOD status</li><li>/all: fetches all favorite pictures</li>`
  );
});

app.get("/yesterday", (req, res) => {
  res.send("this is yesterday");
});

const Schema = mongoose.Schema({
  image_url: String,
  date: String,
});

var apodModel = mongoose.model("apodModel", Schema);

app.post("/addname", (req, res) => {
  const post = new apodModel({
    image_url: req.body.image_url,
    date: req.body.date,
  });
  post.save((error, document) => {
    if (error) {
      res.json({ status: "failure" });
    } else {
      res.json({
        // Save TODO item to the database
        status: "success",
        id: post._id,
        content: req.body,
      });
    }
  });
});

app.get("/all", (req, res) => {
  apodModel.find().then((todos) => {
    res.json({ message: "Return all todos.", todos: todos });
  });
});

app.listen(port);
console.log("Server listenning on port " + port);

function test() {
  console.log(YEEHOW);
}
