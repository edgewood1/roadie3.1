var processFile = require("./bucketList.js");

var target, today, li, y, line;

var z = [];

// 2 - exit / remove calendar
function returnToDo() {
  $("#daily").css("display", "none");
  $("#schedule").show();
  $("#save").css("display", "none");
  $("#backToDo").css("display", "none");

  $("#toDo")
    .show()
    .addClass("col s0");
}

// 1. make calendar

function makeEvents(current) {
  for (i = 1; i <= current.days; i++) {
    // create a box for each day
    var div1 = $("<div>")
      .addClass("box")
      .css({ position: "relative" });
    var div2 = $("<div>")
      .text("Day " + i)
      .css({ color: "#f7f7f7" });
    var div3 = $("<div>")
      .attr({
        id: "day" + i,
        ondrop: "drop(event, this)",
        ondragover: "allowDrop(event)"
      })
      .addClass("drop")
      .css({
        display: "flex",
        height: "calc(14vh)",
        "flex-direction": "column"
      });

    div1.append(div2);
    div1.append(div3);
    $("#daily").append(div1);
  }
  // ???
  // showEvents(current)
  return;
}

// 2. reveal calendar

function showEvents(current) {
  $("#toDo").css("display", "none");
  $("#daily").css("display", "grid");
  $("#save").css("display", "inline");
  readOldEvents(current);
}

// 3. read events for boxes

function readOldEvents(current) {
  var events = current.events;
  // events > events.day1, day2, eventsArr
  if (events) {
    // get day keys removing eventsArr
    var day = Object.keys(events);
    day = day.slice(0, -1);

    // loop through events keys,
    day.forEach(function(elem1, item1) {
      target = $("#" + elem1);
      target.empty();
      var today = events[elem1];
      // loop through items in each event key array
      today.forEach(function(elem2) {
        // post each item
        line = $("<li>").text(elem2);
        var a = Math.floor(Math.random() * 1000000);
        line.attr({
          value: elem2,
          draggable: true,
          id: "a" + a,
          ondragstart: "drag(event)"
        });

        target.append(line);
      });
      // repeat for id=day2
    });
    // showEvents(current);
  } else {
    console.log("show events");
    // showEvents(current);
  }
}

/// 4. READ and SAVE day boxes

function readNewEvents(current) {
  console.log(current);
  current.events = {};
  var here = current.events;
  here["eventsArr"] = [];
  console.log(current);
  var days = parseInt(current["days"]);
  console.log(days);
  // loop through 3 days and get contents save in events obj
  for (z = 1; z <= days; z++) {
    console.log(z);
    var x = "day" + z;
    var y = $("#" + x);

    // console.log(y[0].children);

    if (y[0]["children"].length > 0) {
      console.log("children at ", x);
      var list = y[0].children;
      here[x] = [];
      for (let item of list) {
        here[x].push(item.textContent);
        here["eventsArr"].push(item.textContent);
      }
    }
  }
  console.log(current);
  return current;
}

// 2 onClick save

function saveDaily() {
  var current = JSON.parse(window.localStorage.getItem("current"));
  current = readNewEvents(current);
  $.post("/save", current, function(data) {
    window.localStorage.setItem("current", JSON.stringify(current));

    returnToDo();
  });
}
//  ??? current this is NOT being called
// person adds to schedule calendar
// function addToEvents(item) {
//   var { text, id, location } = item;
//   console.log(text + "  " + location);
//   $.get("/current", function(current) {
//     console.log("return");
//     var event = current["events"];
//     console.log(event[location]);

//     if (event[location]) {
//       event[location].push(text);

//       event["eventsArr"].push(text);
//       $.post("/current", current, function(current) {
//         console.log("posted ", current);
//       });
//     }
//   });
// }

// save schedule-caldendar
$("#save").on("click", saveDaily);

//returns to bucketList

module.exports = {
  makeEvents,
  showEvents,
  readOldEvents,
  readNewEvents,
  saveDaily
  // addToEvents
};
