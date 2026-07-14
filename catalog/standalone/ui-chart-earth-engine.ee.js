/* global ee, print, ui */
// Requires an authenticated Earth Engine project.
// The tab opens immediately and shows a loading overlay while values resolve.
var point = ee.Geometry.Point([16.3738, 48.2082]);
var collection = ee.ImageCollection("MODIS/061/MOD13Q1")
  .filterBounds(point)
  .filterDate("2024-01-01", "2025-01-01")
  .select("NDVI");

var chart = ui.Chart.image.series({
  imageCollection: collection,
  region: point,
  reducer: ee.Reducer.mean(),
  scale: 250,
  xProperty: "system:time_start"
}).setSeriesNames(["NDVI"]);

// system:time_start is returned as epoch milliseconds. ui.Chart recognizes it,
// converts the values to ISO dates, and configures Plotly's x-axis as a date axis.

chart.setOptions({title: "Stored compatibility options"});
chart.onClick(function (x, y, seriesName) {
  print("Selected chart value", x, y, seriesName);
  Map.centerObject(point, 10);
});
chart.show();
