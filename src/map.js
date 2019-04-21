// submit a new place
// select type
// geocode, draw map, markers

var totalData, input, newinput, map;
var x;
// 1. geoCode

function createMap(current) {
  console.log(current);
  current = geoCode(current);
  current
    .then(function(data) {
      console.log("init map");
      return initMap(data);
    })
    .then(function(data) {
      console.log("places");
      googlePlaces(data);
    });
}

function geoCode(current) {
  return new Promise(function(resolve, reject) {
    if (current.pyrmont == undefined) {
      current.pyrmont == {};
    }
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: current.place }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = parseFloat(results[0].geometry.location.lat());
        long = parseFloat(results[0].geometry.location.lng());
        current.pyrmont = new google.maps.LatLng(lat, long);

        resolve(current);
        // initMap(pyrmont, current);
      } else {
        alert("Something got wrong " + status);
      }
    });
  });
}

// 2. draw map

function initMap(current) {
  return new Promise(function(resolve, reject) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: current.pyrmont,
      zoom: 25
    });
    map.setOptions({ scrollwheel: true });
    var input = document.getElementById("place");

    // auto complete >

    var options = {
      types: ["(cities)"],
      componentRestrictions: { country: "us" }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);
    $("#modal1").modal();
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    ///////////////////////////////////////////

    resolve(current);
  });
}

function googlePlaces(current) {
  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  current.service = service;

  // more
  var getNextPage = null;
  var moreButton = document.getElementById("more");
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
    { location: current.pyrmont, radius: 2000, type: [current.type] },
    function(results, status, pagination) {
      if (status !== "OK") return;

      current.places = results;

      createMarkers(current);

      moreButton.disabled = !pagination.hasNextPage;
      getNextPage =
        pagination.hasNextPage &&
        function() {
          pagination.nextPage();
        };
    }
  );
  // add resolve?
}

// 3. create markers

function createMarkers(current) {
  console.log(current);
  if (!current) {
    console.log("there's no current object");
  }
  $("#places").empty();
  var bounds = new google.maps.LatLngBounds();
  placesList = $("#places");
  placesList.empty();

  // the loop
  for (var i = 0, place; (place = current.places[i]); i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });
    // place - geometry
    // placeList = location
    // current["bucketList"] = an array of items
    // current.places[i].name = to do list - one item looped through
    // events contain scheduled items
    // events has an eventsArr array w/ all events
    // it also has an array for each day
    // to do list should not have events on bucketlist OR eventsArr

    // var events = current["events"]; //
    console.log(current.places[i].name);
    // if (current.bucketList && events) {
    console.log(current.events);
    if (
      // if bucketlist or todo doesn't include, then print
      !current["bucketList"].includes(current.places[i].name) &&
      !current.events["eventsArr"].includes(current.places[i].name)
    ) {
      // if (!current["events"]) {
      console.log("going to print to do");
      printToDo(i, placesList, place, current);

      // don't print item if in eventsArr OR bucketList
      // } else if (
      //   !events["eventsArr"].includes(place.name) &&
      //   !current["bucketList"].includes(place.name)
      // )
      //  {
      //   printToDo(i, placesList, place, current);
    }

    bounds.extend(place.geometry.location);
  }
  // $("#bucketList").css("display", "inline");
  // $("#toDo").css("display", "inline");
  map.fitBounds(bounds);
  // }
}

function printToDo(i, placesList, place) {
  // gets the place name and lists it on the "to do" list
  console.log(place);
  var li = $("<li>");
  var a = Math.floor(Math.random() * 1000000);
  li.attr({
    value: place.name,
    draggable: true,
    id: "a" + a,
    ondragstart: "drag(event)",
    padding: "2em",
    margin: "0 2em 2em 0",
    // "box-shadow": "1px 1px 1px rgba(0, 0, 0, 0.3)",
    // "border-radius": "100px",
    border: "2px solid #ececec",
    background: "#F7F7F7",
    transition: "all .5s ease"
  });
  var revisedName = place["name"];
  // .slice(0, 22) + "...";
  li.text(revisedName);
  placesList.append(li);
}
module.exports = {
  createMap,
  geoCode,
  initMap,
  googlePlaces,
  createMarkers
};
