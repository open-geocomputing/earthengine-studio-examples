/* global ee, ui */
// ALPINE//PULSE — linked natural-color and snow-condition maps around Aletsch.
var glacier = ee.Geometry.Point([8.03, 46.48]);
var summer = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(glacier)
  .filterDate("2024-07-01", "2024-09-15")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 25))
  .median();
var snow = summer.normalizedDifference(["B3", "B11"]).rename("NDSI");

ui.App.setHeader({title: "ALPINE//PULSE", subtitle: "Aletsch glacier · landscape and snow signal"});
ui.App.setCss(".alpine-note { padding: 10px 14px; background: #071c2b; color: #dff7ff; font-weight: 600; }");
var naturalMap = ui.Map({name: "Natural color", lon: 8.03, lat: 46.48, zoom: 11});
var snowMap = ui.Map({name: "Snow and ice", lon: 8.03, lat: 46.48, zoom: 11});
naturalMap.setCenter(8.03, 46.48, 11);
snowMap.setCenter(8.03, 46.48, 11);
naturalMap.addLayer(summer, {bands: ["B4", "B3", "B2"], min: 100, max: 3500, gamma: 1.1}, "Summer landscape");
snowMap.addLayer(summer, {bands: ["B12", "B8", "B4"], min: 100, max: 4200}, "SWIR context");
snowMap.addLayer(snow.updateMask(snow.gt(0.15)), {min: 0.15, max: 0.8, palette: ["1d4e89", "74c9ff", "ffffff"]}, "Snow and ice", true, 0.78);
ui.Map.Linker([naturalMap, snowMap], "change-bounds");
var wipe = ui.SplitPanel({firstPanel: naturalMap, secondPanel: snowMap, wipe: true, angle: 32, style: {stretch: "both"}});
var note = ui.Label({value: "Drag the diagonal divider across the glacier tongue.", className: "alpine-note"});
ui.root.clear();
ui.root.add(ui.Panel({widgets: [note, wipe], layout: ui.Panel.Layout.flow("vertical"), style: {stretch: "both"}}));
