// Leaflet Map
var map = L.map('mapid', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 3
});

// Map Picture Overlay
var bounds = [[0,0], [700,1090]];
var image = L.imageOverlay('../static/machall1.png', bounds).addTo(map);

// Enforce bounds
map.fitBounds(bounds);
map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: true });
});

// Default view
map.setView( [350, 545], 0);

// Classes
// Map Comment Class
class mapComment {
  constructor(coordX, coordY, comments, rating, username){
    this.coordX = coordX;
    this.coordY = coordY;
    this.comments = comments;
    this.rating = rating;
    this.username = username;
  }
};

// location types
class mapArea {
  constructor(cornerTL, cornerTR, cornerBL, cornerBR){
    this.cornerTL = cornerTL;
    this.cornerTR = cornerTR;
    this.cornerBL = cornerBL;
    this.cornerBR = cornerBR;
  }
};

class mapFacility extends mapArea {
  constructor(name, identifier, building, floor, room, cornerTL, cornerTR,
    cornerBL, cornerBR, hours, description){

    super(cornerTL, cornerTR, cornerBL, cornerBR);
    this.name = name;
    this.identifier = identifier;
    this.building = building;
    this.floor = floor;
    this.room = room;
    this.hours = hours;
    this.description = description;
  }
};

class mapEvent extends mapArea {
  constructor(title, date, start, end, location, description, cornerTL, cornerTR,
    cornerBL, cornerBR){

    super(cornerTL, cornerTR, cornerBL, cornerBR);
    this.title = title;
    this.date = date;
    this.start = start;
    this.end = end;
    this.location = location;
    this.description = description;
  }
};

// Class of all facilities
class allFacilities {
  constructor(){
    this.studentFacilities = [];
    this.stores = [];
    this.selfFacilities = [];
    this.uniFacilities = [];
    this.events = [];

  }

  // create an mapFacility obj and pushes it into the corresponding array
  addFacility(name, identifier, building, floor, room, cornerTL, cornerTR,
    cornerBL, cornerBR, hours, description) {

      let newFacility = new mapFacility(name, identifier, building, floor, room,
        cornerTL, cornerTR, cornerBL, cornerBR, hours, description);
      if (identifier === "studentFacilities" ){
        this.studentFacilities.push(newFacility);
      }
      else if (identifier === "stores"){
        this.stores.push(newFacility);
      }
      else if (identifier === "selfFacilities"){
        this.selfFacilities.push(newFacility);
      }
      else if (identifier === "uniFacilities"){
        this.uniFacilities.push(newFacility);
      }
  }

  addEvent(title, date, start, end, location, description, cornerTL, cornerTR,
    cornerBL, cornerBR) {

      let newEvent = new mapEvent(title, date, start, end, location, description, cornerTL, cornerTR,
        cornerBL, cornerBR);
      this.events.push(newEvent);
  }
}

class allComments {
  constructor(){
    this.comments = [];
  }

  addComment(coordX, coordY, comments, rating, username){
    let newComment = new mapComment(coordX, coordY, comments, rating, username);
    this.comments.push(newComment);
  }
}

// Map Functions
let polygonList = [];

// draw each color one at a time/determining what color needs to be drawn
function drawMap(facilities){
  // Student facilities
  if (showFacility[0] == 0) {
    facilities.studentFacilities.forEach(function (arrayItem) {
      let newPolygon = L.polygon(
        [arrayItem.cornerTL,arrayItem.cornerTR,arrayItem.cornerBR,arrayItem.cornerBL],
        {color: 'green'}
      ).addTo(map).bindTooltip(arrayItem.description,
        {direction:"center"}
      ).bindPopup(arrayItem.description);
      polygonList.push(newPolygon);
    });

  }

  // Stores
  if (showFacility[1] == 0) {
    facilities.stores.forEach(function (arrayItem) {
      let newPolygon = L.polygon(
        [arrayItem.cornerTL,arrayItem.cornerTR,arrayItem.cornerBR,arrayItem.cornerBL],
        {color: 'blue'}
      ).addTo(map).bindTooltip(arrayItem.name,
        {direction:"center"}
      ).bindPopup(arrayItem.description);
      polygonList.push(newPolygon);
    });
  }

  // Self facilities
  if (showFacility[2]==0) {
    facilities.selfFacilities.forEach(function (arrayItem) {
      let newPolygon = L.polygon(
        [arrayItem.cornerTL,arrayItem.cornerTR,arrayItem.cornerBR,arrayItem.cornerBL],
        {color: 'red'}
      ).addTo(map).bindTooltip(arrayItem.name,
        {direction:"center"}
      ).bindPopup(arrayItem.description);
      polygonList.push(newPolygon);
    });
  }

  // Uni facilities
  if (showFacility[3]==0) {
    facilities.uniFacilities.forEach(function (arrayItem) {
      let newPolygon = L.polygon(
        [arrayItem.cornerTL,arrayItem.cornerTR,arrayItem.cornerBR,arrayItem.cornerBL],
        {color: 'orange'}
      ).addTo(map).bindTooltip(arrayItem.name,
        {direction:"center"}
      ).bindPopup(arrayItem.description);
      polygonList.push(newPolygon);
    });
  }

  facilities.events.forEach(function (arrayItem) {
    let newPolygon = L.polygon(
      [arrayItem.cornerTL,arrayItem.cornerTR,arrayItem.cornerBR,arrayItem.cornerBL],
      {color: 'yellow'}
    ).addTo(map).bindTooltip(arrayItem.title,
      {direction:"center"}
    ).bindPopup(arrayItem.description);
    polygonList.push(newPolygon);
  });
  // (title, date, start, end, location, description, cornerTL, cornerTR,
  //   cornerBL, cornerBR);
}

// Clear map of all polygons
function clearMap(){
  polygonList.forEach(function (polyItem){
    map.removeLayer(polyItem);
  });
}

let commentList = [];

function clearComments(){
  commentList.forEach(function (commentItem){
    map.removeLayer(commentItem);
  });
}



function drawComment(allComments){
  allComments.comments.forEach(function (commentItem){

      // var commentsPopup = '<form id="commentForm">' +
      // '<button type="button" id="upvote">Upvote</button>' +
      // '</form>';

      let newComment = L.marker(L.latLng([commentItem.coordX,commentItem.coordY]))
      .bindTooltip(commentItem.username + ": " + commentItem.comments)
      .bindPopup("Rank: " + commentItem.rating)
      .addTo(map);

      commentList.push(newComment);

      var upvote = L.DomUtil.get('upvote');
      console.log(upvote);
      // L.DomEvent.addListener(upvote, 'click', function (e) {
      //   let commentForm = document.getElementById('comment').value;
      //   console.log("upvote");
      //   map.closePopup();
      // });
  });
}

// Hide/Show facilities
$('#studentFacilities').click(function() {
    if($(this).is(":checked")) {
            showFacility[0] = 0;
            clearMap();
            drawMap(test);
        } else {
            showFacility[0] = 1;
            clearMap();
            drawMap(test);
        }
});

$('#stores').click(function() {
    if($(this).is(":checked")) {
            showFacility[1] = 0;
            clearMap();
            drawMap(test);

        } else {
            showFacility[1] = 1;
            clearMap();
            drawMap(test);
        }
});

$('#personalFacilities').click(function() {
    if($(this).is(":checked")) {
            showFacility[2] = 0;
            clearMap();
            drawMap(test);

        } else {
            showFacility[2] = 1;
            clearMap();
            drawMap(test);
        }
});

$('#uniFacilities').click(function() {
    if($(this).is(":checked")) {
            showFacility[3] = 0;
            clearMap();
            drawMap(test);

        } else {
            showFacility[3] = 1;
            clearMap();
            drawMap(test);
        }
});


// Popup Comment
var commentHTML = '<form id="commentForm">' +
  '<label for="comment">Comment:</label><br>' +
  '<input type="text" id="comment" name="comment"><br>' +
  '<button type="button" id="commentSubmit">Submit</button>' +
  '</form>';

function onMapClick(e) {
  let coordinates = e.latlng;
  var commentPopup = L.popup()
  .setLatLng(coordinates)
  .setContent(commentHTML)
  .openOn(map);

  var commentSubmit = L.DomUtil.get('commentSubmit');
  L.DomEvent.addListener(commentSubmit, 'click', function (e) {
    let commentForm = document.getElementById('comment').value;
    if (commentForm != ""){
      // update database here
      let comment = commentForm;
      let lat = coordinates["lat"];
      let lng = coordinates["lng"];
      let rating = 1;
      let username = "sandesh";

      create_posts(lat, lng, comment, rating, username);

      L.marker(L.latLng([ lat,lng ]))
      .bindTooltip(username + ": " + comment)
      .addTo(map);

    }
    map.closePopup();
    // setTimeout(window.location.reload(),2000);
    


  });

}

// Main
let showFacility = [1, 1, 1, 1];

let test = new allFacilities();
let commenttest = new allComments();

test.addFacility("Bake chef","stores", "Mac", "6166", "267", [450,682],	[450,742],	[424,682]	,[424,742], "9:00 am - 5:00 pm",	"viet sub");
test.addFacility("coffee shop",	"uniFacilities",	"msc",	"2","296",	[450,753], [449,792],	[423,754],	[423,792],	"9:00 am - 5:30 pm",	"coffee shop");
test.addFacility("pharmacy", "selfFacilities", "msc", "2", "291", [564,602], [566,673], [498,602],	[498,673], "8:30 am - 6:00 am", "pharcmy for all your pharmacy needs");
test.addFacility("stor", "stores", "msc", "2", "278", [524,395],	[524,463],	[442,395], [442,463],	"7:00 am - 11:00 pm",	"the stor has a lot of stuff");
test.addFacility("lse", "studentFacilities", "msc", "2", "293", [642,635],	[642,823], [574,627],	[574,826], "10:00 am - 5:00 pm", "the leadership and student engagement office");

// commenttest.addComment(500, 500, "this place is cool", "2", "username");
// commenttest.addComment(600, 500, "comment", "rating", "username");
// console.log("comment list: " + commentList);
// clearComments();

drawMap(test);

map.on('click', onMapClick);

drawComment(commenttest);
clearComments();

//
//
// test
// Pins test (Y, X);
// var sol = L.latLng([ 370,602 ]);
// L.marker(sol).addTo(map);

// Pin with popup
// var test1 = L.latLng([ 250,600 ]);
// L.marker(test1).addTo(map).bindPopup("hello");

// Line
// var travel = L.polyline([sol, test1]).addTo(map);

// Polygon test
// var polygon = L.rectangle(
//   [[277, 293],[223, 328]],
//   {color: 'yellow'}
// ).addTo(map).bindPopup("test");

// Long/Lat popup
// var popup = L.popup();
//
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);
