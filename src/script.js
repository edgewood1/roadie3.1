var dragDrop = require("./dragDrop");
var map = require("./map");

var process1 = require("./bucketList"); // needed to click on a particular place
var schedule = require("./schedule"); //?
var modals = require("./modals"); // necessary for modals to work
// even though not instantiated literally
var current = {};
// 1. Item dragged -----

allowDrop = dragDrop.allowDrop;

// 2. the dragging of item

drag = dragDrop.drag;

// 3. dropping the item --

drop = dragDrop.drop;

$(document).ready(function() {
  //default place?
  console.log("hit");
  $(".sidenav").sidenav({ closeOnClick: true, menuWidth: 120 });
  $(".sidenav li").click(() => {
    $(".sidenav").sidenav("close");
  });
  $(".datepicker").datepicker();
  // $("#toDo").attr("style", "display: none");
  $("#title")
    .text("'Create' a new destination or 'Select' an old one")
    .css("text-align", "center");

  class Current {
    constructor(place) {
      this.place = place;
      this.bucketList = [];
      this.events = { eventsArr: [] };
      this.type = ["museum"];
      this.pyrmont = {};
    }
  }

  var current = new Current("Durham, NC");
  window.localStorage.setItem("current", JSON.stringify(current));

  map.createMap(current);

  map.geoCode(current);
});
// saves daily
