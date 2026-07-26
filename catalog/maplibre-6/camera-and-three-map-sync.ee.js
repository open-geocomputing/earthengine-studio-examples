// Open three MapLibre maps and synchronize center, zoom, bearing, and pitch.
var map1 = Map.create({
  id: "sync-streets",
  name: "Synced streets",
  provider: "maplibre",
  lon: 11.4041,
  lat: 47.2692,
  zoom: 9,
  pitch: 45,
  bearing: -20
});
map1.setOptions("OSM");

var map2 = Map.create({
  id: "sync-satellite",
  name: "Synced satellite",
  provider: "maplibre",
  lon: 11.4041,
  lat: 47.2692,
  zoom: 9
});
map2.setOptions("SATELLITE");

var map3 = Map.create({
  id: "sync-hybrid",
  name: "Synced hybrid orbit",
  provider: "maplibre",
  lon: 11.4041,
  lat: 47.2692,
  zoom: 9
});
map3.setOptions("HYBRID");

// Renderer-speed synchronization avoids a Worker feedback loop.
var unlinkMaps = syncMaps(map1, map2, map3);
var orbitController = null;

map1.flyTo({
  center: [11.4041, 47.2692],
  zoom: 11,
  pitch: 58,
  bearing: 25,
  duration: 2400,
  essential: false
}, function() {
  print("flyTo completed");
  map1.easeTo({
    bearing: -35,
    pitch: 52,
    duration: 1600,
    essential: false
  }, function() {
    print("easeTo completed");
    orbitController = map1.orbit({
      center: [11.4041, 47.2692],
      zoom: 10.5,
      pitch: 62,
      duration: 24000,
      rotations: 1,
      loop: true,
      essential: false
    });
  });
});

print(
  "Controllers",
  "orbitController.pause()/play()/stop(), map1.stopCameraAnimation(), unlinkMaps()"
);
