var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
require("dotenv").config();
// var serviceAccount = require("/Users/meldejesus/Desktop/firebase/Roadie3-204342809abd.json");
var serviceAccount;
console.log("here = ", process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  serviceAccount = require("../keys");
} else if (process.env.NODE_ENV == "production") {
  serviceAccount = require("../../config/roadie3.json");
}
console.log(serviceAccount);
JSON.stringify(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-counter-56e8f.firebaseio.com/"
});

var database = admin.database();

// var database = firebase.database();

router.get("/theme", function(req, res) {
  console.log("here - ", req.query);
  var current = req.query;
  database.ref(current.theme + "/").once(
    "value",
    function(snapshot) {
      current = snapshot.val();
      return res.send(current);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      return res.send(errorObject.code);
    }
  );
});

router.get("/places", function(req, res) {
  //   console.log("hit2");
  var data = [];
  database.ref().once("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(snap) {
      var place1 = snap.val().place;
      console.log("what? - ", place1);
      theme = snap.key;
      if (place1) {
        var place2 = { place: place1, theme: theme };
        console.log("what ", place2);
        data.push(place2);
      }
    });
    res.send(data);
  });
});

// new item

// update item

router.post("/save", function(req, res) {
  var current = req.body;
  database
    .ref(current.theme + "/")
    .set(current)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
  // res.send(current);
});

module.exports = router;
