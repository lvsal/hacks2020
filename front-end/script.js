var map = L.map('mapid', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 3
});

var bounds = [[0,0], [700,1000]];
var image = L.imageOverlay('machall1.png', bounds).addTo(map);
map.fitBounds(bounds);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

var sol = L.latLng([ 145, 175.2 ]);
L.marker(sol).addTo(map);

var test1 = L.latLng([ 600, 900 ]);
L.marker(test1).addTo(map).bindPopup("hello");
// map.setView( [600, 500], 1);
