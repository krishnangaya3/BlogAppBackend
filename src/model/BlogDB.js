const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://gaya3:gaya397@cluster0.bjgsw.mongodb.net/blogDatabase?retryWrites=true&w=majority"
);

const Schema = mongoose.Schema;

var articleSchema = new Schema({
  name: String,
  title: String,
  description: String,
});

var ArticleInfo = mongoose.model("articles", articleSchema);

module.exports = ArticleInfo;
