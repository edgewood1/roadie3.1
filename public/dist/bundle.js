/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bucketList.js":
/*!***************************!*\
  !*** ./src/bucketList.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var modals = __webpack_require__(/*! ./modals */ \"./src/modals.js\");\nvar schedule = __webpack_require__(/*! ./schedule */ \"./src/schedule.js\");\nvar map = __webpack_require__(/*! ./map */ \"./src/map.js\");\n\n// move to config\n\nfunction postTitle(current) {\n  console.log(current);\n  console.log(\"PostTitle\");\n  var doThis = current[\"place\"].slice(0, -5);\n  $(\"#destination\")\n    .text(\"Destination: \" + doThis)\n    .css(\"margin-bottom\", \"2%\");\n  $(\"#theme1\")\n    .text(\"Theme: \" + current.theme)\n    .css(\"margin-bottom\", \"2%\");\n  $(\"#arrive1\")\n    .text(\"Arrival: \" + current.arrive)\n    .css(\"margin-bottom\", \"2%\");\n  $(\"#depart1\")\n    .text(\"Depart: \" + current.depart)\n    .css(\"margin-bottom\", \"2%\");\n  $(\"body\").css(\"overflow\", \"auto\");\n  return current;\n}\n\nfunction printBucketList(current) {\n  console.log(\"4printBucketList \", current);\n  var bucket = $(\"#bucketText\");\n  bucket.empty();\n\n  if (current.bucketList == undefined) {\n  } else {\n    current[\"bucketList\"].forEach(function(e, i) {\n      var li = $(\"<li>\");\n      var a = Math.floor(Math.random() * 1000000);\n      li.attr({\n        value: e,\n        draggable: true,\n        id: \"a\" + a,\n        ondragstart: \"drag(event)\"\n      });\n\n      li.text(e);\n      bucket.append(li);\n    });\n  }\n  $(\"#bucketList\").css(\"display\", \"inline\");\n  // $(\"#toDo\").css(\"display\", \"inline\");\n  schedule.makeEvents(current);\n  return current;\n}\n\n// after dragging to bucket list?\nfunction addToBucketList(item) {\n  // var { text, id } = item;\n  console.log(\"addtobl\");\n\n  var div = $(\"#bucketText\");\n  var lis = div[0].children;\n  var list = [];\n  for (let item of lis) {\n    list.push(item.textContent);\n  }\n  console.log(list);\n  current[\"bucketList\"] = list;\n\n  console.log(current);\n\n  return current;\n}\n\n// Save bucketlist -\n\nfunction saveSchedule() {\n  $(\"#schedule\").hide();\n\n  // read bucket list and put into list\n  var div = $(\"#bucketText\");\n  var lis = div[0].children;\n  var list = [];\n  for (let item of lis) {\n    list.push(item.textContent);\n  }\n  var current = JSON.parse(window.localStorage.getItem(\"current\"));\n  console.log(current.theme);\n\n  current[\"bucketList\"] = list;\n\n  $.post(\"/save\", current, function(data) {\n    schedule.showEvents(current);\n    schedule.readOldEvents(current);\n  });\n}\n// save bucketlist?\n$(\"#schedule\").on(\"click\", { param: readOldEvents }, saveSchedule);\n\n/// selecting one old from list of old places\n\nmodule.exports = {\n  postTitle,\n  printBucketList,\n  addToBucketList,\n  saveSchedule\n};\n\n\n//# sourceURL=webpack:///./src/bucketList.js?");

/***/ }),

/***/ "./src/dragDrop.js":
/*!*************************!*\
  !*** ./src/dragDrop.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 1. Item dragged -----\n\nvar allowDrop = function allowDrop(ev) {\n  ev.preventDefault();\n};\n\n// 2. the dragging of item\n\nvar drag = function drag(ev) {\n  var send = {\n    text: ev.target.textContent,\n    id: ev.target.id\n  };\n  send = JSON.stringify(send);\n  ev.dataTransfer.setData(\"application/x-moz-node\", send);\n};\n\n// 3. dropping the item --\n\nvar drop = function drop(ev, el) {\n  ev.preventDefault();\n  var item = ev.dataTransfer.getData(\"application/x-moz-node\");\n  item = JSON.parse(item);\n\n  var { text, id } = item;\n  var dropLocation = el;\n\n  var fullItem = $(\"#\" + id);\n  console.log(fullItem);\n  //daily\n  if (dropLocation[\"className\"].includes(\"drop\")) {\n    console.log(\"daybox!\");\n    // $(dro).addClass(\"daily_text\");\n    dropLocation.append(fullItem[0]);\n    console.log(\"id \", id);\n    console.log(\"text \", text);\n    console.log(dropLocation[\"id\"]);\n    item.location = dropLocation[\"id\"];\n  } else if (dropLocation[\"id\"].includes(\"bucketText\")) {\n    dropLocation.appendChild(fullItem[0]);\n  } else if (dropLocation[\"id\"].includes(\"places\")) {\n    dropLocation.append(fullItem[0]);\n  }\n};\n\nmodule.exports = { drop, drag, allowDrop };\n\n\n//# sourceURL=webpack:///./src/dragDrop.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// submit a new place\n// select type\n// geocode, draw map, markers\n\nvar totalData, input, newinput, map;\nvar x;\n// 1. geoCode\n\nfunction createMap(current) {\n  console.log(current);\n  current = geoCode(current);\n  current\n    .then(function(data) {\n      console.log(\"init map\");\n      return initMap(data);\n    })\n    .then(function(data) {\n      console.log(\"places\");\n      googlePlaces(data);\n    });\n}\n\nfunction geoCode(current) {\n  return new Promise(function(resolve, reject) {\n    if (current.pyrmont == undefined) {\n      current.pyrmont == {};\n    }\n    var geocoder = new google.maps.Geocoder();\n    geocoder.geocode({ address: current.place }, function(results, status) {\n      if (status == google.maps.GeocoderStatus.OK) {\n        lat = parseFloat(results[0].geometry.location.lat());\n        long = parseFloat(results[0].geometry.location.lng());\n        current.pyrmont = new google.maps.LatLng(lat, long);\n\n        resolve(current);\n        // initMap(pyrmont, current);\n      } else {\n        alert(\"Something got wrong \" + status);\n      }\n    });\n  });\n}\n\n// 2. draw map\n\nfunction initMap(current) {\n  return new Promise(function(resolve, reject) {\n    map = new google.maps.Map(document.getElementById(\"map\"), {\n      center: current.pyrmont,\n      zoom: 25\n    });\n    map.setOptions({ scrollwheel: true });\n    var input = document.getElementById(\"place\");\n\n    // auto complete >\n\n    var options = {\n      types: [\"(cities)\"],\n      componentRestrictions: { country: \"us\" }\n    };\n\n    var autocomplete = new google.maps.places.Autocomplete(input, options);\n    $(\"#modal1\").modal();\n    // Bind the map's bounds (viewport) property to the autocomplete object,\n    // so that the autocomplete requests use the current map bounds for the\n    // bounds option in the request.\n    autocomplete.bindTo(\"bounds\", map);\n\n    // Set the data fields to return when the user selects a place.\n    autocomplete.setFields([\"address_components\", \"geometry\", \"icon\", \"name\"]);\n    ///////////////////////////////////////////\n\n    resolve(current);\n  });\n}\n\nfunction googlePlaces(current) {\n  // Create the places service.\n  var service = new google.maps.places.PlacesService(map);\n  current.service = service;\n\n  // more\n  var getNextPage = null;\n  var moreButton = document.getElementById(\"more\");\n  moreButton.onclick = function() {\n    moreButton.disabled = true;\n    if (getNextPage) getNextPage();\n  };\n\n  // Perform a nearby search.\n  service.nearbySearch(\n    { location: current.pyrmont, radius: 2000, type: [current.type] },\n    function(results, status, pagination) {\n      if (status !== \"OK\") return;\n\n      current.places = results;\n\n      createMarkers(current);\n\n      moreButton.disabled = !pagination.hasNextPage;\n      getNextPage =\n        pagination.hasNextPage &&\n        function() {\n          pagination.nextPage();\n        };\n    }\n  );\n  // add resolve?\n}\n\n// 3. create markers\n\nfunction createMarkers(current) {\n  console.log(current);\n  if (!current) {\n    console.log(\"there's no current object\");\n  }\n  $(\"#places\").empty();\n  var bounds = new google.maps.LatLngBounds();\n  placesList = $(\"#places\");\n  placesList.empty();\n\n  // the loop\n  for (var i = 0, place; (place = current.places[i]); i++) {\n    var image = {\n      url: place.icon,\n      size: new google.maps.Size(71, 71),\n      origin: new google.maps.Point(0, 0),\n      anchor: new google.maps.Point(17, 34),\n      scaledSize: new google.maps.Size(25, 25)\n    };\n\n    var marker = new google.maps.Marker({\n      map: map,\n      icon: image,\n      title: place.name,\n      position: place.geometry.location\n    });\n    // place - geometry\n    // placeList = location\n    // current[\"bucketList\"] = an array of items\n    // current.places[i].name = to do list - one item looped through\n    // events contain scheduled items\n    // events has an eventsArr array w/ all events\n    // it also has an array for each day\n    // to do list should not have events on bucketlist OR eventsArr\n\n    // var events = current[\"events\"]; //\n    console.log(current.places[i].name);\n    // if (current.bucketList && events) {\n    console.log(current.events);\n    if (\n      // if bucketlist or todo doesn't include, then print\n      !current[\"bucketList\"].includes(current.places[i].name) &&\n      !current.events[\"eventsArr\"].includes(current.places[i].name)\n    ) {\n      // if (!current[\"events\"]) {\n      console.log(\"going to print to do\");\n      printToDo(i, placesList, place, current);\n\n      // don't print item if in eventsArr OR bucketList\n      // } else if (\n      //   !events[\"eventsArr\"].includes(place.name) &&\n      //   !current[\"bucketList\"].includes(place.name)\n      // )\n      //  {\n      //   printToDo(i, placesList, place, current);\n    }\n\n    bounds.extend(place.geometry.location);\n  }\n  // $(\"#bucketList\").css(\"display\", \"inline\");\n  // $(\"#toDo\").css(\"display\", \"inline\");\n  map.fitBounds(bounds);\n  // }\n}\n\nfunction printToDo(i, placesList, place) {\n  // gets the place name and lists it on the \"to do\" list\n  console.log(place);\n  var li = $(\"<li>\");\n  var a = Math.floor(Math.random() * 1000000);\n  li.attr({\n    value: place.name,\n    draggable: true,\n    id: \"a\" + a,\n    ondragstart: \"drag(event)\",\n    padding: \"2em\",\n    margin: \"0 2em 2em 0\",\n    // \"box-shadow\": \"1px 1px 1px rgba(0, 0, 0, 0.3)\",\n    // \"border-radius\": \"100px\",\n    border: \"2px solid #ececec\",\n    background: \"#F7F7F7\",\n    transition: \"all .5s ease\"\n  });\n  var revisedName = place[\"name\"];\n  // .slice(0, 22) + \"...\";\n  li.text(revisedName);\n  placesList.append(li);\n}\nmodule.exports = {\n  createMap,\n  geoCode,\n  initMap,\n  googlePlaces,\n  createMarkers\n};\n\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/modals.js":
/*!***********************!*\
  !*** ./src/modals.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = __webpack_require__(/*! ./map */ \"./src/map.js\");\n\n// 1. Create New Place\n\nfunction getNewPlace(e) {\n  e.preventDefault();\n  // $(\"#title\").css(\"display\", \"none\");\n  var place = $(\"#place\")\n    .val()\n    .trim();\n  var theme = $(\"#theme\")\n    .val()\n    .trim();\n  var arrive = $(\"#arrive\")\n    .val()\n    .trim();\n  var depart = $(\"#depart\")\n    .val()\n    .trim();\n\n  var start = moment(arrive);\n  var end = moment(depart);\n  var duration = moment.duration(end.diff(start));\n  var days = duration.asDays();\n  days += 1;\n  console.log(days);\n  var current = {\n    theme: theme,\n    place: place,\n    arrive: arrive,\n    depart: depart,\n    days: days,\n    bucketList: [],\n    events: { eventsArr: [] }\n  };\n  window.localStorage.setItem(\"current\", JSON.stringify(current));\n  $.post(\"/save\", current, function(data) {\n    console.log(data);\n    map.createMap(current);\n    return current;\n  });\n}\n\n// 2. shows list of old places\n\nfunction getOldPlace() {\n  console.log(\"hit\");\n  $(\"#daily\").css(\"display\", \"none\");\n  $(\"#modal2\").modal();\n  $(\"td\").empty();\n  var theme, place1;\n  $(\"#themeplace\").empty();\n\n  $.get(\"/places\", function(data) {\n    console.log(data);\n    if (data) {\n      data.forEach(elem => {\n        var tr = $(\"<tr>\");\n        var td = $(\"<td>\");\n        var message = elem.place + \"  |  \" + elem.theme;\n        var a = $(\"<a>\")\n          .attr({\n            class: \"place2\",\n            \"data-name\": elem.place,\n            \"data-theme\": elem.theme\n          })\n          .text(message);\n        td.append(a);\n        tr.append(td);\n        $(\"#themeplace\").append(tr);\n      });\n    } else {\n      var message = \"Use the 'create' tab to create an event\";\n      td.text(message);\n      tr.append(td);\n      //onclick\n      $(\"#themeplace\").append(tr);\n    }\n  });\n}\n\n///back end\nfunction convertToCurrent(e) {\n  console.log(\"1. converting \", e);\n  var current = {\n    place: e.target.dataset.name,\n    theme: e.target.dataset.theme\n  };\n  // closes modal\n\n  return current;\n}\n\nfunction selectNewPlace(event) {\n  // create current\n  console.log(\"hit\", event);\n  $(\"#modal2\").modal();\n  $(\"#title\").css(\"display\", \"none\");\n  var current = modals.convertToCurrent(event);\n  console.log(current);\n  // call db to get rest of data\n  $.get(\"/theme\", current, function(data) {\n    // db doesn't save empty arrays,\n    // so re-insert non-saved datatypes:\n    if (\"events\" in data) {\n      console.log(\"ok1\");\n      if (\"eventsArr\" in data[\"events\"]) {\n        console.log(\"ok2\");\n      } else {\n        data.events[\"eventsArr\"] = [];\n        console.log(data);\n      }\n    } else {\n      data[\"events\"] = [];\n      data.events[\"eventsArr\"] = [];\n      console.log(data);\n    }\n    if (\"bucketList\" in data) {\n      console.log(\"ok3\");\n    } else {\n      data[\"bucketList\"] = [];\n    }\n\n    window.localStorage.setItem(\"current\", JSON.stringify(data));\n\n    current = printBucketList(data);\n\n    current = postTitle(current);\n    map.createMap(current);\n    return current;\n  });\n}\n\n$(\"#themeplace\").on(\n  \"click\",\n  {\n    param: event\n  },\n  selectNewPlace\n);\n\n// 1. create new place\n$(\".create\").on(\"click\", function(e) {\n  $(\"#daily\").css(\"display\", \"none\");\n  $(\"#modal1\").modal();\n});\n\n$(\"#submit\").on(\"click\", getNewPlace);\n\n// 2. get old place\n$(\".place7\").on(\"click\", getOldPlace);\n\n// 3. help\n$(\".help\").on(\"click\", function() {\n  $(\"#daily\").css(\"display\", \"none\");\n  $(\"#modal3\").modal();\n});\n\nmodule.exports = {\n  getNewPlace,\n  getOldPlace,\n  convertToCurrent\n};\n\n\n//# sourceURL=webpack:///./src/modals.js?");

/***/ }),

/***/ "./src/schedule.js":
/*!*************************!*\
  !*** ./src/schedule.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var processFile = __webpack_require__(/*! ./bucketList.js */ \"./src/bucketList.js\");\n\nvar target, today, li, y, line;\n\nvar z = [];\n\n// 2 - exit / remove calendar\nfunction returnToDo() {\n  $(\"#daily\").css(\"display\", \"none\");\n  $(\"#schedule\").show();\n  $(\"#save\").css(\"display\", \"none\");\n  $(\"#backToDo\").css(\"display\", \"none\");\n\n  $(\"#toDo\")\n    .show()\n    .addClass(\"col s0\");\n}\n\n// 1. make calendar\n\nfunction makeEvents(current) {\n  for (i = 1; i <= current.days; i++) {\n    // create a box for each day\n    var div1 = $(\"<div>\")\n      .addClass(\"box\")\n      .css({ position: \"relative\" });\n    var div2 = $(\"<div>\")\n      .text(\"Day \" + i)\n      .css({ color: \"#f7f7f7\" });\n    var div3 = $(\"<div>\")\n      .attr({\n        id: \"day\" + i,\n        ondrop: \"drop(event, this)\",\n        ondragover: \"allowDrop(event)\"\n      })\n      .addClass(\"drop\")\n      .css({\n        display: \"flex\",\n        height: \"calc(14vh)\",\n        \"flex-direction\": \"column\"\n      });\n\n    div1.append(div2);\n    div1.append(div3);\n    $(\"#daily\").append(div1);\n  }\n  // ???\n  // showEvents(current)\n  return;\n}\n\n// 2. reveal calendar\n\nfunction showEvents(current) {\n  $(\"#toDo\").css(\"display\", \"none\");\n  $(\"#daily\").css(\"display\", \"grid\");\n  $(\"#save\").css(\"display\", \"inline\");\n  readOldEvents(current);\n}\n\n// 3. read events for boxes\n\nfunction readOldEvents(current) {\n  var events = current.events;\n  // events > events.day1, day2, eventsArr\n  if (events) {\n    // get day keys removing eventsArr\n    var day = Object.keys(events);\n    day = day.slice(0, -1);\n\n    // loop through events keys,\n    day.forEach(function(elem1, item1) {\n      target = $(\"#\" + elem1);\n      target.empty();\n      var today = events[elem1];\n      // loop through items in each event key array\n      today.forEach(function(elem2) {\n        // post each item\n        line = $(\"<li>\").text(elem2);\n        var a = Math.floor(Math.random() * 1000000);\n        line.attr({\n          value: elem2,\n          draggable: true,\n          id: \"a\" + a,\n          ondragstart: \"drag(event)\"\n        });\n\n        target.append(line);\n      });\n      // repeat for id=day2\n    });\n    // showEvents(current);\n  } else {\n    console.log(\"show events\");\n    // showEvents(current);\n  }\n}\n\n/// 4. READ and SAVE day boxes\n\nfunction readNewEvents(current) {\n  console.log(current);\n  current.events = {};\n  var here = current.events;\n  here[\"eventsArr\"] = [];\n  console.log(current);\n  var days = parseInt(current[\"days\"]);\n  console.log(days);\n  // loop through 3 days and get contents save in events obj\n  for (z = 1; z <= days; z++) {\n    console.log(z);\n    var x = \"day\" + z;\n    var y = $(\"#\" + x);\n\n    // console.log(y[0].children);\n\n    if (y[0][\"children\"].length > 0) {\n      console.log(\"children at \", x);\n      var list = y[0].children;\n      here[x] = [];\n      for (let item of list) {\n        here[x].push(item.textContent);\n        here[\"eventsArr\"].push(item.textContent);\n      }\n    }\n  }\n  console.log(current);\n  return current;\n}\n\n// 2 onClick save\n\nfunction saveDaily() {\n  var current = JSON.parse(window.localStorage.getItem(\"current\"));\n  current = readNewEvents(current);\n  $.post(\"/save\", current, function(data) {\n    window.localStorage.setItem(\"current\", JSON.stringify(current));\n\n    returnToDo();\n  });\n}\n//  ??? current this is NOT being called\n// person adds to schedule calendar\n// function addToEvents(item) {\n//   var { text, id, location } = item;\n//   console.log(text + \"  \" + location);\n//   $.get(\"/current\", function(current) {\n//     console.log(\"return\");\n//     var event = current[\"events\"];\n//     console.log(event[location]);\n\n//     if (event[location]) {\n//       event[location].push(text);\n\n//       event[\"eventsArr\"].push(text);\n//       $.post(\"/current\", current, function(current) {\n//         console.log(\"posted \", current);\n//       });\n//     }\n//   });\n// }\n\n// save schedule-caldendar\n$(\"#save\").on(\"click\", saveDaily);\n\n//returns to bucketList\n\nmodule.exports = {\n  makeEvents,\n  showEvents,\n  readOldEvents,\n  readNewEvents,\n  saveDaily\n  // addToEvents\n};\n\n\n//# sourceURL=webpack:///./src/schedule.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dragDrop = __webpack_require__(/*! ./dragDrop */ \"./src/dragDrop.js\");\nvar map = __webpack_require__(/*! ./map */ \"./src/map.js\");\n\nvar process1 = __webpack_require__(/*! ./bucketList */ \"./src/bucketList.js\"); // needed to click on a particular place\nvar schedule = __webpack_require__(/*! ./schedule */ \"./src/schedule.js\"); //?\nvar modals = __webpack_require__(/*! ./modals */ \"./src/modals.js\"); // necessary for modals to work\n// even though not instantiated literally\nvar current = {};\n// 1. Item dragged -----\n\nallowDrop = dragDrop.allowDrop;\n\n// 2. the dragging of item\n\ndrag = dragDrop.drag;\n\n// 3. dropping the item --\n\ndrop = dragDrop.drop;\n\n$(document).ready(function() {\n  //default place?\n  console.log(\"hit\");\n  $(\".sidenav\").sidenav({ closeOnClick: true, menuWidth: 120 });\n  $(\".sidenav li\").click(() => {\n    $(\".sidenav\").sidenav(\"close\");\n  });\n  $(\".datepicker\").datepicker();\n  // $(\"#toDo\").attr(\"style\", \"display: none\");\n  $(\"#title\")\n    .text(\"'Create' a new destination or 'Select' an old one\")\n    .css(\"text-align\", \"center\");\n\n  class Current {\n    constructor(place) {\n      this.place = place;\n      this.bucketList = [];\n      this.events = { eventsArr: [] };\n      this.type = [\"museum\"];\n      this.pyrmont = {};\n    }\n  }\n\n  var current = new Current(\"Durham, NC\");\n  window.localStorage.setItem(\"current\", JSON.stringify(current));\n\n  map.createMap(current);\n\n  map.geoCode(current);\n});\n// saves daily\n\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ })

/******/ });