var map = require("./map");

// 1. Create New Place

function getNewPlace(e) {
  e.preventDefault();
  // $("#title").css("display", "none");
  var place = $("#place")
    .val()
    .trim();
  var theme = $("#theme")
    .val()
    .trim();
  var arrive = $("#arrive")
    .val()
    .trim();
  var depart = $("#depart")
    .val()
    .trim();

  var start = moment(arrive);
  var end = moment(depart);
  var duration = moment.duration(end.diff(start));
  var days = duration.asDays();
  days += 1;
  console.log(days);
  var current = {
    theme: theme,
    place: place,
    arrive: arrive,
    depart: depart,
    days: days,
    bucketList: [],
    events: { eventsArr: [] }
  };
  window.localStorage.setItem("current", JSON.stringify(current));
  $.post("/save", current, function(data) {
    console.log(data);
    map.createMap(current);
    return current;
  });
}

// 2. shows list of old places

function getOldPlace() {
  console.log("hit");
  $("#daily").css("display", "none");
  $("#modal2").modal();
  $("td").empty();
  var theme, place1;
  $("#themeplace").empty();

  $.get("/places", function(data) {
    console.log(data);
    if (data) {
      data.forEach(elem => {
        var tr = $("<tr>");
        var td = $("<td>");
        var message = elem.place + "  |  " + elem.theme;
        var a = $("<a>")
          .attr({
            class: "place2",
            "data-name": elem.place,
            "data-theme": elem.theme
          })
          .text(message);
        td.append(a);
        tr.append(td);
        $("#themeplace").append(tr);
      });
    } else {
      var message = "Use the 'create' tab to create an event";
      td.text(message);
      tr.append(td);
      //onclick
      $("#themeplace").append(tr);
    }
  });
}

///back end
function convertToCurrent(e) {
  console.log("1. converting ", e);
  var current = {
    place: e.target.dataset.name,
    theme: e.target.dataset.theme
  };
  // closes modal

  return current;
}

function selectNewPlace(event) {
  // create current
  console.log("hit", event);
  $("#modal2").modal();
  $("#title").css("display", "none");
  var current = modals.convertToCurrent(event);
  console.log(current);
  // call db to get rest of data
  $.get("/theme", current, function(data) {
    // db doesn't save empty arrays,
    // so re-insert non-saved datatypes:
    if ("events" in data) {
      console.log("ok1");
      if ("eventsArr" in data["events"]) {
        console.log("ok2");
      } else {
        data.events["eventsArr"] = [];
        console.log(data);
      }
    } else {
      data["events"] = [];
      data.events["eventsArr"] = [];
      console.log(data);
    }
    if ("bucketList" in data) {
      console.log("ok3");
    } else {
      data["bucketList"] = [];
    }

    window.localStorage.setItem("current", JSON.stringify(data));

    current = printBucketList(data);

    current = postTitle(current);
    map.createMap(current);
    return current;
  });
}

$("#themeplace").on(
  "click",
  {
    param: event
  },
  selectNewPlace
);

// 1. create new place
$(".create").on("click", function(e) {
  $("#daily").css("display", "none");
  $("#modal1").modal();
});

$("#submit").on("click", getNewPlace);

// 2. get old place
$(".place7").on("click", getOldPlace);

// 3. help
$(".help").on("click", function() {
  $("#daily").css("display", "none");
  $("#modal3").modal();
});

module.exports = {
  getNewPlace,
  getOldPlace,
  convertToCurrent
};
