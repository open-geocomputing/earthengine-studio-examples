/* global ee, Map, ui, print */
// Spectral Signature Lab — click anywhere to open a Sentinel-2 band profile.
var bands = ["B2", "B3", "B4", "B5", "B6", "B7", "B8", "B8A", "B11", "B12"];
var image = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(ee.Geometry.Point([16.37, 48.21]))
  .filterDate("2024-06-01", "2024-09-30")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 15))
  .median();

Map.setCenter(16.37, 48.21, 10);
Map.addLayer(image, {bands: ["B4", "B3", "B2"], min: 100, max: 3200}, "Vienna Sentinel-2");
Map.onClick(function (coordinates) {
  var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
  var sample = image.select(bands).reduceRegion({reducer: ee.Reducer.mean(), geometry: point, scale: 20});
  var values = bands.map(function (band) { return sample.get(band); });
  ui.Plotly({
    name: "Spectral signature",
    data: [{type: "scatter", mode: "lines+markers", x: bands, y: values, line: {color: "#0f766e", width: 3}}],
    layout: {title: {text: "Sentinel-2 signature at " + coordinates.lon.toFixed(3) + ", " + coordinates.lat.toFixed(3)}, yaxis: {title: {text: "Surface reflectance"}}}
  }).show();
  print("Sample location", coordinates);
});
print("Ready", "Click water, vegetation, bare ground, or the city to compare signatures.");
