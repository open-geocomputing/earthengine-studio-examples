// Turn a bounded ee.ImageCollection into a tile-based animation.
// Studio resolves every frame descriptor before playback, while visible pixels
// continue to load on demand from Earth Engine.
var alps = ee.Geometry.Point([11.4, 47.27]);
var ndviFrames = ee.ImageCollection("MODIS/061/MOD13Q1")
  .filterBounds(alps)
  .filterDate("2024-04-01", "2024-10-01")
  .select("NDVI")
  .limit(10);

Map.setCenter(11.4, 47.27, 7.5);
Map.setOptions("HYBRID");

var timeline = Map.addLayer(ndviFrames, {
  renderer: "image-animation",
  min: 0,
  max: 9000,
  palette: ["#402218", "#aa7d45", "#f1e7a3", "#67a844", "#164a2a"],
  timeProperty: "system:time_start",
  labelProperty: "system:index",
  frameDuration: 850,
  autoplay: true,
  loop: true,
  maxFrames: 10,
  essential: false
}, "MODIS NDVI timeline", true, 0.82);

timeline.onFrameChange(function(frame) {
  print("Selected frame", frame);
});

print("Prepared collection", ndviFrames);
print(
  "Try in Console after preparation",
  "timeline.pause(); timeline.setFrame(3); timeline.setFrameDuration(400); timeline.play();"
);
print(
  "Timestamp selection",
  'timeline.setFrame(new Date("2024-07-01T00:00:00Z"));'
);
