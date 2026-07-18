/* global ee, Map, print */
// Change Detection Workbench — three indices, precomputed as toggleable layers.
var region = ee.Geometry.Rectangle([-115.35, 35.9, -114.85, 36.35], null, false);
function imageFor(year) {
  return ee.ImageCollection("LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL")
    .filterBounds(region)
    .filterDate(year + "-01-01", (year + 1) + "-01-01")
    .first()
    .clip(region);
}
var before = imageFor(2017);
var after = imageFor(2024);
var ndviChange = after.normalizedDifference(["nir", "red"]).subtract(before.normalizedDifference(["nir", "red"])).rename("NDVI change");
var waterChange = after.normalizedDifference(["green", "nir"]).subtract(before.normalizedDifference(["green", "nir"])).rename("NDWI change");
var burnChange = after.normalizedDifference(["nir", "swir2"]).subtract(before.normalizedDifference(["nir", "swir2"])).rename("NBR change");

Map.setCenter(-115.1, 36.12, 9);
Map.addLayer(after, {bands: ["red", "green", "blue"], min: 0.05, max: 0.35}, "2024 composite");
Map.addLayer(ndviChange, {min: -0.4, max: 0.4, palette: ["b91c1c", "f8fafc", "15803d"]}, "NDVI change");
Map.addLayer(waterChange, {min: -0.4, max: 0.4, palette: ["f97316", "f8fafc", "0284c7"]}, "NDWI change", false);
Map.addLayer(burnChange, {min: -0.4, max: 0.4, palette: ["7f1d1d", "f8fafc", "2563eb"]}, "NBR change", false);
print("Workbench", "Toggle the three change layers and inspect the same location in each.");
