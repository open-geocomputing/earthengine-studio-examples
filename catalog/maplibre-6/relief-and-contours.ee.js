// MapLibre 6 relief rendering from one Earth Engine elevation image.
// Hillshade and contours reuse Studio's terrain-RGB encoding. They do not
// enable terrain themselves, so this example explicitly enables 3D terrain too.
var innsbruck = [11.4041, 47.2692];
var dem = ee.ImageCollection("COPERNICUS/DEM/GLO30")
  .select("DEM")
  .mosaic();

Map.setCenter(innsbruck[0], innsbruck[1], 10, {
  bearing: -24,
  pitch: 58
});
Map.setOptions("HYBRID");
Map.setViewStyle("3D", {
  terrain: dem,
  terrainExaggeration: 1.35,
  atmosphere: true
});

Map.addLayer(dem, {
  renderer: "hillshade",
  // standard, basic, combined, igor, or multidirectional
  method: "multidirectional",
  exaggeration: 0.55,
  illuminationDirection: 315,
  illuminationAnchor: "map",
  shadowColor: "#352f2a",
  highlightColor: "#fff3d0",
  accentColor: "#6f7f82"
}, "Multidirectional hillshade", true, 0.72);

Map.addLayer(dem, {
  renderer: "contours",
  units: "metric",
  // Each zoom key maps to [minor interval, major interval].
  thresholds: {
    0: [500, 1000],
    8: [100, 500],
    11: [20, 100],
    14: [10, 50]
  },
  minorColor: "#65757b",
  majorColor: "#172126",
  minorWidth: 0.7,
  majorWidth: 1.6,
  labels: true,
  labelColor: "#172126",
  labelSize: 11
}, "Metric contours", true, 0.9);

print("Tip", "Change units to imperial or try another hillshade method.");
