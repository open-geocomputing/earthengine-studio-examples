/* global ee, Map, ui, print */
// FOREST//LOSS DETECTIVE — annual loss signals in Rondônia, Brazil.
var region = ee.Geometry.Rectangle([-64.8, -11.7, -62.0, -8.7], null, false);
var change = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");
var canopy = change.select("treecover2000").clip(region);
var lossYear = change.select("lossyear").clip(region).selfMask();

Map.setCenter(-63.4, -10.2, 7.5);
Map.setOptions("SATELLITE");
Map.addLayer(canopy.updateMask(canopy.gt(20)), {min: 20, max: 100, palette: ["d9f99d", "166534"]}, "Tree cover in 2000", true, 0.72);
Map.addLayer(lossYear, {min: 1, max: 24, palette: ["fde68a", "fb923c", "dc2626", "6b0218"]}, "Forest-loss year");

var groupedArea = ee.List(ee.Image.pixelArea().addBands(lossYear).reduceRegion({
  reducer: ee.Reducer.sum().group({groupField: 1, groupName: "year"}),
  geometry: region,
  scale: 120,
  maxPixels: 1e8
}).get("groups"));
var years = groupedArea.map(function (item) {
  return ee.Number(ee.Dictionary(item).get("year")).add(2000);
});
var areas = groupedArea.map(function (item) {
  return ee.Number(ee.Dictionary(item).get("sum")).divide(1e6);
});
ui.Plotly({
  name: "Forest loss by year",
  data: [{type: "bar", x: years, y: areas, marker: {color: "#dc2626"}}],
  layout: {title: {text: "Rondônia forest loss"}, xaxis: {title: {text: "Year"}}, yaxis: {title: {text: "Area (km²)"}}}
}).show();
print("Tip", "Click visible layers with Inspector, then compare the annual loss figure.");
