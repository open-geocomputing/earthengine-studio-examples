/* global ee, Map, ui, print */
// DROUGHT//SIGNAL — European PDSI anomaly map with an Earth Engine time series.
var region = ee.Geometry.Rectangle([-10, 35, 30, 60], null, false);
var climate = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
  .filterBounds(region)
  .filterDate("2015-01-01", "2025-01-01")
  .select("pdsi");
var drought2022 = climate.filterDate("2022-06-01", "2022-09-01").mean().multiply(0.01);

Map.setCenter(10, 48, 4);
Map.addLayer(drought2022, {
  bands: ["pdsi"],
  min: -5,
  max: 5,
  computePixels: true,
  tileSize: 128,
  shader: "vec4(1.0 - normalized.r, 0.35 + 0.5 * normalized.r, normalized.r, alpha * 0.85)"
}, "Summer 2022 PDSI shader");

var chart = ui.Chart.image.series({
  imageCollection: climate.map(function (image) {
    return image.multiply(0.01).copyProperties(image, ["system:time_start"]);
  }),
  region: region,
  reducer: ee.Reducer.mean(),
  scale: 50000,
  xProperty: "system:time_start"
}).setSeriesNames(["Regional PDSI"]);
chart.show();
print("Palette", "Warm colors indicate dry conditions; blue indicates wet conditions.");
