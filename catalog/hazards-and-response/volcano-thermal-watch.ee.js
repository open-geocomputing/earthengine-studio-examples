/* global ee, Map, print */
// VOLCANO//THERMAL WATCH — a pitched Etna scene with thermal detections.
var etna = ee.Geometry.Point([15.004, 37.751]);
var terrain = ee.Image("USGS/SRTMGL1_003").select("elevation").unmask(0);
var sentinel = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(etna)
  .filterDate("2024-07-01", "2024-08-20")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30))
  .median();
var thermal = ee.ImageCollection("MODIS/061/MOD14A2")
  .filterBounds(etna)
  .filterDate("2024-07-01", "2024-08-20")
  .select("FireMask")
  .max()
  .gte(7)
  .selfMask();

Map.setCenter(15.004, 37.751, 11.7, {pitch: 66, bearing: -28});
Map.setViewStyle("SCENE3D", {terrain: terrain, terrainExaggeration: 1.8});
Map.addLayer(sentinel, {
  bands: ["B12", "B8", "B4"],
  min: 100,
  max: 4200,
  gamma: 1.05
}, "Sentinel-2 SWIR false color", true, 0.93);
Map.addLayer(thermal, {palette: ["fff59d", "ff6d00", "b71c1c"]}, "MODIS thermal detections", true, 0.95);
Map.addLayer(ee.FeatureCollection([ee.Feature(etna, {name: "Mount Etna"})]), {color: "ffffff", pointSize: 6}, "Summit");
print("Scene", "Mount Etna thermal watch");
print("Tip", "Tilt, rotate, and inspect the thermal layer over the terrain.");
