/* global ee, ui */
// RESERVOIR//PULSE — Lake Mead water extent and a two-decade history.
var lake = ee.Geometry.Rectangle([-114.92, 35.95, -114.25, 36.55], null, false);
var yearlyWater = ee.ImageCollection("JRC/GSW1_4/YearlyHistory")
  .filterBounds(lake)
  .filterDate("2000-01-01", "2022-01-01")
  .map(function (image) {
    return image.select("waterClass").gte(2)
      .multiply(ee.Image.pixelArea())
      .divide(1e6)
      .rename("water_km2")
      .copyProperties(image, ["system:time_start"]);
  });
var recent = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(lake)
  .filterDate("2023-04-01", "2023-10-31")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 25))
  .median();

ui.App.setHeader({title: "RESERVOIR//PULSE", subtitle: "Lake Mead surface-water history"});
ui.App.setCss(".water-layout { gap: 12px; padding: 12px; background: #eef8ff; }");
var map = ui.Map({name: "Lake Mead", lon: -114.58, lat: 36.23, zoom: 10});
map.setCenter(-114.58, 36.23, 10);
map.addLayer(recent, {bands: ["B4", "B3", "B2"], min: 150, max: 3200}, "Sentinel-2");
map.addLayer(recent.normalizedDifference(["B3", "B8"]).gt(0.05).selfMask(), {palette: ["20b8ff"]}, "Recent water", true, 0.7);

var chart = ui.Chart.image.series({
  imageCollection: yearlyWater,
  region: lake,
  reducer: ee.Reducer.sum(),
  scale: 90,
  xProperty: "system:time_start"
}).setSeriesNames(["Water area (km²)"]);
var body = ui.SplitPanel({firstPanel: map, secondPanel: chart, orientation: "horizontal", style: {stretch: "both"}});
ui.root.clear();
ui.root.add(body);
