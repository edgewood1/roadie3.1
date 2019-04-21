// 1. Item dragged -----

var allowDrop = function allowDrop(ev) {
  ev.preventDefault();
};

// 2. the dragging of item

var drag = function drag(ev) {
  var send = {
    text: ev.target.textContent,
    id: ev.target.id
  };
  send = JSON.stringify(send);
  ev.dataTransfer.setData("application/x-moz-node", send);
};

// 3. dropping the item --

var drop = function drop(ev, el) {
  ev.preventDefault();
  var item = ev.dataTransfer.getData("application/x-moz-node");
  item = JSON.parse(item);

  var { text, id } = item;
  var dropLocation = el;

  var fullItem = $("#" + id);
  console.log(fullItem);
  //daily
  if (dropLocation["className"].includes("drop")) {
    console.log("daybox!");
    // $(dro).addClass("daily_text");
    dropLocation.append(fullItem[0]);
    console.log("id ", id);
    console.log("text ", text);
    console.log(dropLocation["id"]);
    item.location = dropLocation["id"];
  } else if (dropLocation["id"].includes("bucketText")) {
    dropLocation.appendChild(fullItem[0]);
  } else if (dropLocation["id"].includes("places")) {
    dropLocation.append(fullItem[0]);
  }
};

module.exports = { drop, drag, allowDrop };
