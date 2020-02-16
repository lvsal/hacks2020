// Leaflet Map
var map = L.map('mapid', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 3
});

// Map Picture Overlay
var bounds = [[0,0], [700,1090]];
var image = L.imageOverlay('machall1.png', bounds).addTo(map);

// Enforce bounds
map.fitBounds(bounds);
map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: true });
});

// Default view
map.setView( [350, 545], 0);

// Classes
// location types
class mapArea {
  constructor(name, identifier, building, floor, room, cornerTL, cornerTR,
              cornerBL, cornerBR){
    this.name = name;
    this.identifier = identifier;
    this.building = building;
    this.floor = floor;
    this.room = room;
    this.cornerTL = cornerTL;
    this.cornerTR = cornerTR;
    this.cornerBL = cornerBL;
    this.cornerBR = cornerBR;
  }
};

class mapFacility extends mapArea {
  constructor(name, identifier, building, floor, room, cornerTL, cornerTR,
    cornerBL, cornerBR, hours, description){

    super(name, identifier, building, floor, room, cornerTL, cornerTR,
      cornerBL, cornerBR);
    this.hours = hours;
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
    // this.events = [];

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
}

// Map Functions
// draw each color one at a time/determining what color needs to be drawn
function drawMap(facilities){
  facilities.stores.forEach(function (arrayItem) {
    L.polygon(
      [arrayItem.cornerTL,arrayItem.cornerTR,arrayItem.cornerBR,arrayItem.cornerBL],
      {color: 'blue'}
    ).addTo(map).bindTooltip(arrayItem.description,
      {direction:"center"}
    );
  });
}

// Main

let = showFacility = [0, 0, 0, 0, 0];

let test = new allFacilities();

test.addFacility("Bake chef","stores", "Mac", "6166", "267", [450,682],	[450,742],	[424,682]	,[424,742], "9:00 am - 5:00 pm",	"Bake chef: viet sub");
test.addFacility("coffee shop",	"stores",	"msc",	"2","296",	[450,753], [449,792],	[423,754],	[423,792],	"9:00 am - 5:30 pm",	"coffee house: coffee shop");
test.addFacility("pharmacy", "stores", "msc", "2", "291", [564,602], [566,673], [498,602],	[498,673], "8:30 am - 6:00 am", "pharcmy for all your pharmacy needs");
test.addFacility("stor", "stores", "msc", "2", "278", [524,395],	[524,463],	[442,395], [442,463],	"7:00 am - 11:00 pm",	"the stor has a lot of stuff");
test.addFacility("lse", "studentFacilities", "msc", "2", "293", [642,635],	[642,823], [574,627],	[574,826], "10:00 am - 5:00 pm", "the leadership and student engagement office");

drawMap(test);

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

// Polygon test
// var polygon = L.rectangle(
//   [[277, 293],[223, 328]],
//   {color: 'yellow'}
// ).addTo(map).bindPopup("test");
