/* global ee, Map, ui, print */
// Classification Studio — train and evaluate a compact Sentinel-2 classifier.
var region = ee.Geometry.Rectangle([16.15, 48.05, 16.58, 48.32], null, false);
var image = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(region)
  .filterDate("2024-05-01", "2024-09-30")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
  .median()
  .select(["B2", "B3", "B4", "B8", "B11", "B12"]);
var worldCover = ee.ImageCollection("ESA/WorldCover/v200").first().select("Map");
var labels = worldCover.remap([10, 40, 50, 80], [0, 1, 2, 3]).rename("class");
var samples = image.addBands(labels).stratifiedSample({
  numPoints: 80,
  classBand: "class",
  region: region,
  scale: 20,
  seed: 42,
  geometries: true
});
var split = samples.randomColumn("split", 42);
var training = split.filter(ee.Filter.lt("split", 0.7));
var testing = split.filter(ee.Filter.gte("split", 0.7));
var classifier = ee.Classifier.smileRandomForest(60).train({features: training, classProperty: "class", inputProperties: image.bandNames()});
var classified = image.classify(classifier);
var matrix = testing.classify(classifier).errorMatrix("class", "classification");

Map.setCenter(16.37, 48.2, 10);
Map.addLayer(image, {bands: ["B4", "B3", "B2"], min: 100, max: 3200}, "Sentinel-2");
Map.addLayer(classified, {min: 0, max: 3, palette: ["166534", "facc15", "ef4444", "2563eb"]}, "Random forest classes", true, 0.72);
Map.addLayer(samples, {color: "ffffff", pointSize: 3}, "Training and testing samples", false);
print("Validation confusion matrix", matrix);
print("Validation accuracy", matrix.accuracy());
ui.Plotly({
  name: "Classification palette",
  data: [{
    type: "bar",
    x: ["Forest", "Cropland", "Built", "Water"],
    y: [1, 1, 1, 1],
    marker: {color: ["#166534", "#facc15", "#ef4444", "#2563eb"]},
    hovertemplate: "<b>%{x}</b><extra></extra>"
  }],
  layout: {
    title: {text: "Classification palette"},
    yaxis: {visible: false, range: [0, 1.08], fixedrange: true},
    xaxis: {fixedrange: true},
    bargap: 0.16,
    showlegend: false
  }
}).show();
