const express = require("express");
const cors = require("cors");
const ArticleInfo = require("./src/model/BlogDB");
const loginRouter = require("./src/routes/loginRoute");
const signupRouter = require("./src/routes/signupRoute");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.post("/createarticle", function (req, res) {
  var article = {
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
  };
  console.log(article);
  const articleData = new ArticleInfo(article);
  articleData.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.get("/article/:name", function (req, res) {
  const articleName = req.params.name;
  console.log("name::", articleName);
  ArticleInfo.findOne({ name: articleName }).then(function (article) {
    console.log("article::", article);
    res.json(article);
  });
});

app.get("/article-list", function (req, res) {
  ArticleInfo.find().then(function (articles) {
    console.log("article::", articles);
    res.json(articles);
  });
});

app.post("/edit-article", function (req, res) {
  const name = req.body.name;
  var article = {
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
  };
  ArticleInfo.findOneAndUpdate({ name: name }, article).then(function (
    articleData
  ) {
    console.log("articleData::", articleData);
    res.json(articleData);
  });
});

app.post("/deletearticle", function (req, res) {
  const name = req.body.name;

  ArticleInfo.findOneAndDelete({ name: name }).then(function (article) {
    res.json(article);
  });
});

/*app.use(cors());
// Post Method

// Basic Article Fetch Route
app.get("/api/article/:name", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  try {
    const articleName = req.params.name;
    ArticleInfo.findOne({ name: articleName }).then(function (article) {
      res.status(200).json(article);
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

// Upvotes Routing
app.post("/api/article/:name/upvotes", (req, res) => {
  const articleName = req.params.name;
  const filter = { name: articleName };
  const update = { $inc: { upvotes: 1 } };
  ArticleInfo.findOneAndUpdate(filter, update, { new: true }).then(function (
    article
  ) {
    res.json(article);
  });
});

// Comments Routing
app.post("/api/article/:name/comments", (req, res) => {
  const articleName = req.params.name;
  const { username, text } = req.body;
  const filter = { name: articleName };
  const update = { $push: { comments: { username, text } } };
  ArticleInfo.findOneAndUpdate(filter, update, { new: true }).then(function (
    article
  ) {
    res.json(article);
  });
});
*/
// Port number
app.listen(5001, () => {
  console.log("Listening on port 5001");
});
