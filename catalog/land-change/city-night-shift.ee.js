/* global ee, ui */
// CITY//NIGHT SHIFT — a linked daylight and night-light portrait of Cairo.
var cairo = ee.Geometry.Point([31.2357, 30.0444]);
var daylight = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(cairo)
  .filterDate("2024-01-01", "2024-12-31")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
  .median();
var lights = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
  .filterBounds(cairo)
  .filterDate("2024-01-01", "2025-01-01")
  .select("avg_rad")
  .median();

ui.App.setHeader({title: "CITY//NIGHT SHIFT", subtitle: "Cairo by reflected sunlight and emitted light"});
ui.App.setCss(".night-label { padding: 9px 14px; background: #080719; color: #f4e9ff; font-weight: 700; }");
var dayMap = ui.Map({name: "Daylight", lon: 31.2357, lat: 30.0444, zoom: 9});
var nightMap = ui.Map({name: "Night lights", lon: 31.2357, lat: 30.0444, zoom: 9});
dayMap.setCenter(31.2357, 30.0444, 9);
nightMap.setCenter(31.2357, 30.0444, 9);
dayMap.addLayer(daylight, {bands: ["B4", "B3", "B2"], min: 150, max: 3300}, "Sentinel-2 daylight");
nightMap.setOptions("BLACK_MARBLE");
nightMap.addLayer(lights.updateMask(lights.gt(0.8)), {min: 0.8, max: 80, palette: ["512da8", "ec4899", "fde047", "ffffff"]}, "VIIRS radiance", true, 0.88);
ui.Map.Linker([dayMap, nightMap], "change-bounds");
var wipe = ui.SplitPanel({firstPanel: dayMap, secondPanel: nightMap, wipe: true, angle: 18, style: {stretch: "both"}});
ui.root.clear();
ui.root.add(ui.Panel({widgets: [ui.Label({value: "DAYLIGHT  ↔  NIGHT LIGHTS", className: "night-label"}), wipe], layout: ui.Panel.Layout.flow("vertical"), style: {stretch: "both"}}));
