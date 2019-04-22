var modals = require("./modals");
var schedule = require("./schedule");
var map = require("./map");

// move to config

function postTitle(current) {
  console.log(current);
  console.log("PostTitle");
  var doThis = current["place"].slice(0, -5);
  $("#destination")
    .text("Destination: " + doThis)
    .css("margin-bottom", "2%");
  $("#theme1")
    .text("Theme: " + current.theme)
    .css("margin-bottom", "2%");
  $("#arrive1")
    .text("Arrival: " + current.arrive)
    .css("margin-bottom", "2%");
  $("#depart1")
    .text("Depart: " + current.depart)
    .css("margin-bottom", "2%");
  $("body").css("overflow", "auto");
  return current;
}

function printBucketList(current) {
  console.log("4printBucketList ", current);
  var bucket = $("#bucketText");
  bucket.empty();

  if (current.bucketList == undefined) {
  } else {
    current["bucketList"].forEach(function(e, i) {
      var li = $("<li>");
      var a = Math.floor(Math.random() * 1000000);
      li.attr({
        value: e,
        draggable: true,
        id: "a" + a,
        ondragstart: "drag(event)"
      });

      li.text(e);
      bucket.append(li);
    });
  }
  $("#bucketList").css("display", "inline");
  // $("#toDo").css("display", "inline");
  schedule.makeEvents(current);
  return current;
}

// after dragging to bucket list?
function addToBucketList(item) {
  // var { text, id } = item;
  console.log("addtobl");

  var div = $("#bucketText");
  var lis = div[0].children;
  var list = [];
  for (let item of lis) {
    list.push(item.textContent);
  }
  console.log(list);
  current["bucketList"] = list;

  console.log(current);

  return current;
}

// Save bucketlist -

function saveSchedule() {
  $("#schedule").hide();

  // read bucket list and put into list
  var div = $("#bucketText");
  var lis = div[0].children;
  var list = [];
  for (let item of lis) {
    list.push(item.textContent);
  }
  var current = JSON.parse(window.localStorage.getItem("current"));
  console.log(current.theme);

  current["bucketList"] = list;

  $.post("/save", current, function(data) {
    schedule.showEvents(current);
    schedule.readOldEvents(current);
  });
}
// save bucketlist?
$("#schedule").on("click", { param: schedule.readOldEvents }, saveSchedule);

/// selecting one old from list of old places

module.exports = {
  postTitle,
  printBucketList,
  addToBucketList,
  saveSchedule
};
