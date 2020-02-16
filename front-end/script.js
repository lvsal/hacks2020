var map = L.map('mapid', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 3
});

// Map Picture Overlay
var bounds = [[0,0], [633,1090]];
var image = L.imageOverlay('machall1.png', bounds).addTo(map);

// Enforce bounds
map.fitBounds(bounds);
map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: true });
});

// Pins test (Y, X);
var sol = L.latLng([ 370,602 ]);
L.marker(sol).addTo(map);

// Pin with popup
// var test1 = L.latLng([ 250,600 ]);
// L.marker(test1).addTo(map).bindPopup("hello");

// Line
// var travel = L.polyline([sol, test1]).addTo(map);

// map.setView( [600, 500], 1);

// Long/Lat popup
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

var polygon = L.rectangle(
  [[277, 293],[223, 328]],
  {color: 'yellow'}
).addTo(map).bindPopup("test");
