/* global ee, ui */
// Cloud Mask Shootout — a deliberately cloudy, snow-free tropical scene.
var region = ee.Geometry.Rectangle([-60.02, -3.4, -59.68, -2.8], null, false);
var center = ee.Geometry.Point([-59.85, -3.1]);
var source = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(center)
  .filterDate("2024-02-01", "2024-04-30")
  .filter(ee.Filter.gte("CLOUDY_PIXEL_PERCENTAGE", 45))
  .filter(ee.Filter.lte("CLOUDY_PIXEL_PERCENTAGE", 55))
  .sort("CLOUDY_PIXEL_PERCENTAGE", false)
  .first()
  .clip(region);
var scl = source.select("SCL");
var cloudOrShadow = scl.eq(3)
  .or(scl.eq(8))
  .or(scl.eq(9))
  .or(scl.eq(10));
var clearMask = cloudOrShadow.not();
var vis = {bands: ["B4", "B3", "B2"], min: 100, max: 3200, gamma: 1.1};

ui.App.setHeader({title: "Cloud Mask Shootout", subtitle: "Raw tropical clouds versus an SCL cloud-and-shadow mask"});
var rawMap = ui.Map({name: "Raw cloudy scene", lon: -59.85, lat: -3.1, zoom: 10});
var maskedMap = ui.Map({name: "Cloud masked", lon: -59.85, lat: -3.1, zoom: 10});
rawMap.setCenter(-59.85, -3.1, 10);
maskedMap.setCenter(-59.85, -3.1, 10);
rawMap.addLayer(source, vis, "Raw Sentinel-2 scene");
maskedMap.addLayer(source.updateMask(clearMask), vis, "SCL cloud-and-shadow mask");
maskedMap.addLayer(cloudOrShadow.selfMask(), {palette: ["ff2d95"]}, "Pixels removed by mask", false, 0.65);
ui.Map.Linker([rawMap, maskedMap], "change-bounds");
ui.root.clear();
ui.root.add(ui.SplitPanel({firstPanel: rawMap, secondPanel: maskedMap, wipe: true, angle: 0, style: {stretch: "both"}}));
print("Selected scene cloudiness (%)", source.get("CLOUDY_PIXEL_PERCENTAGE"));
