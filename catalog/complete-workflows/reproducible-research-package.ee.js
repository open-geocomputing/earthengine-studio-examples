/* global ee, Map, Export, print, require, ui */
// Reproducible Research Package — modules, Map, Plotly, Console, and export.
var statistics = require("./research-summary.ee.js");
var monthlyNdvi = [0.31, 0.34, 0.42, 0.55, 0.67, 0.74, 0.78, 0.73, 0.61, 0.49, 0.38, 0.32];
var summary = statistics.summarize(monthlyNdvi);
var region = ee.Geometry.Rectangle([11.15, 47.05, 11.65, 47.45], null, false);
var image = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(region)
  .filterDate("2024-06-01", "2024-09-30")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
  .median();
var ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI");

Map.setCenter(11.4, 47.25, 10);
Map.addLayer(image, {bands: ["B4", "B3", "B2"], min: 100, max: 3200}, "Sentinel-2");
Map.addLayer(ndvi, {min: 0, max: 0.85, palette: ["6b3f1d", "f5e6a8", "7cb342", "0b5d1e"]}, "NDVI", true, 0.72);

ui.Plotly({
  name: "Research package · NDVI",
  data: [{type: "scatter", mode: "lines+markers", x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], y: monthlyNdvi, line: {color: "#15803d", width: 3}}],
  layout: {title: {text: "Illustrative monthly vegetation profile"}, yaxis: {title: {text: "NDVI"}, range: [0, 1]}}
}).show();

var report = ee.FeatureCollection([ee.Feature(region.centroid(), {
  metric: "illustrative_monthly_ndvi",
  mean: summary.mean,
  minimum: summary.minimum,
  maximum: summary.maximum,
  source: "Earth Engine Studio reproducible research example"
})]);
Export.table.toDrive({collection: report, description: "studio_research_summary", fileFormat: "CSV"});
print("Python summary", summary);
print("Workflow", "Map and Plotly are open; a reviewable CSV task is ready in Tasks.");
