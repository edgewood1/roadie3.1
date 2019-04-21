var express = require("express");

// ref.push({
//   name: "c"
// });

var app = express();
app.use(express.static("public"));
// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handlebars view engine
var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main", partialsDir: __dirname + "/views" })
);
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("index");
});

// routes

var db = require("./routes/firebase");
app.use("/", db);

var port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
