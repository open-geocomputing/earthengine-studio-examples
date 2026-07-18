/* global ee, Map, ui */
// Multi-Region Comparison — synchronized vegetation histories for three cities.
var regions = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([16.37, 48.21]).buffer(12000), {name: "Vienna"}),
  ee.Feature(ee.Geometry.Point([2.35, 48.86]).buffer(12000), {name: "Paris"}),
  ee.Feature(ee.Geometry.Point([-3.70, 40.42]).buffer(12000), {name: "Madrid"})
]);
var ndvi = ee.ImageCollection("MODIS/061/MOD13Q1")
  .filterDate("2022-01-01", "2025-01-01")
  .select("NDVI")
  .map(function (image) {
    return image.multiply(0.0001).copyProperties(image, ["system:time_start"]);
  });

Map.setCenter(6, 47, 4);
Map.addLayer(regions, {color: "22d3ee", fillColor: "22d3ee22"}, "Comparison regions");
var chart = ui.Chart.image.seriesByRegion({
  imageCollection: ndvi,
  regions: regions,
  reducer: ee.Reducer.mean(),
  band: "NDVI",
  scale: 1000,
  xProperty: "system:time_start",
  seriesProperty: "name"
}).setSeriesNames(["Vienna", "Paris", "Madrid"]);
chart.show();
