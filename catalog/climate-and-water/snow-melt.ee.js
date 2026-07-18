/* global ee, Map, ui, print */
// SNOW//MELT — daily MODIS snow over pitched Alpine terrain plus a seasonal chart.
var alps = ee.Geometry.Rectangle([9.4, 45.6, 13.8, 48.0], null, false);
var snow = ee.ImageCollection("MODIS/061/MOD10A1")
  .filterBounds(alps)
  .filterDate("2024-01-01", "2025-01-01")
  .select("NDSI_Snow_Cover");
var springSnow = snow.filterDate("2024-04-01", "2024-05-01").median();
var terrain = ee.ImageCollection("COPERNICUS/DEM/GLO30").mosaic().select("DEM").unmask(0);

Map.setCenter(11.4, 47.0, 7.5, {pitch: 58, bearing: -22});
Map.setViewStyle("SCENE3D", {terrain: terrain, terrainExaggeration: 1.7});
Map.setOptions("SATELLITE");
Map.addLayer(springSnow.updateMask(springSnow.gt(10)), {
  min: 10,
  max: 100,
  palette: ["294c7a", "7bc8ff", "ffffff"]
}, "April 2024 snow cover", true, 0.8);

var chart = ui.Chart.image.series({
  imageCollection: snow,
  region: alps,
  reducer: ee.Reducer.mean(),
  scale: 5000,
  xProperty: "system:time_start"
}).setSeriesNames(["Mean snow cover"]);
chart.show();
print("Explore", "Rotate the terrain, then compare the daily snow-cover figure.");
