/* global ee, ui */
// Cloud Mask Shootout — lenient and strict Sentinel-2 scene-class masks.
var point = ee.Geometry.Point([-122.3, 47.5]);
var source = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(point)
  .filterDate("2024-03-01", "2024-05-31")
  .sort("CLOUDY_PIXEL_PERCENTAGE")
  .first();
var scl = source.select("SCL");
var lenientMask = scl.neq(9).and(scl.neq(10));
var strictMask = lenientMask
  .and(scl.neq(3))
  .and(scl.neq(8))
  .and(scl.neq(11));
var vis = {bands: ["B4", "B3", "B2"], min: 100, max: 3200, gamma: 1.1};

ui.App.setHeader({title: "Cloud Mask Shootout", subtitle: "Compare lenient and strict SCL masking"});
var lenientMap = ui.Map({name: "Lenient mask", lon: -122.3, lat: 47.5, zoom: 9});
var strictMap = ui.Map({name: "Strict mask", lon: -122.3, lat: 47.5, zoom: 9});
lenientMap.setCenter(-122.3, 47.5, 9);
strictMap.setCenter(-122.3, 47.5, 9);
lenientMap.addLayer(source.updateMask(lenientMask), vis, "Lenient mask");
strictMap.addLayer(source.updateMask(strictMask), vis, "Strict mask");
ui.Map.Linker([lenientMap, strictMap], "change-bounds");
ui.root.clear();
ui.root.add(ui.SplitPanel({firstPanel: lenientMap, secondPanel: strictMap, wipe: true, angle: 0, style: {stretch: "both"}}));
