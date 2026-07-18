/* global ee, ui */
// COAST//TIME MACHINE — Landsat water change at the Ganges-Brahmaputra delta.
var region = ee.Geometry.Rectangle([89.25, 21.55, 90.35, 22.45], null, false);

function landsat5() {
  return ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(region)
    .filterDate("1989-11-01", "1991-03-31")
    .filter(ee.Filter.lt("CLOUD_COVER", 35))
    .median()
    .multiply(0.0000275)
    .add(-0.2)
    .clip(region);
}
function landsat9() {
  return ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
    .filterBounds(region)
    .filterDate("2023-11-01", "2025-03-31")
    .filter(ee.Filter.lt("CLOUD_COVER", 35))
    .median()
    .multiply(0.0000275)
    .add(-0.2)
    .clip(region);
}

var oldImage = landsat5();
var newImage = landsat9();
var oldWater = oldImage.normalizedDifference(["SR_B2", "SR_B4"]).gt(0.05);
var newWater = newImage.normalizedDifference(["SR_B3", "SR_B5"]).gt(0.05);
var gainedWater = newWater.and(oldWater.not()).selfMask();
var lostWater = oldWater.and(newWater.not()).selfMask();

ui.App.setHeader({title: "COAST//TIME MACHINE", subtitle: "Thirty-four years of delta movement"});
var oldMap = ui.Map({name: "1990 coast", lon: 89.8, lat: 22.0, zoom: 8});
var newMap = ui.Map({name: "2024 coast", lon: 89.8, lat: 22.0, zoom: 8});
oldMap.setCenter(89.8, 22.0, 8);
newMap.setCenter(89.8, 22.0, 8);
oldMap.addLayer(oldImage, {bands: ["SR_B3", "SR_B2", "SR_B1"], min: 0, max: 0.3}, "Landsat 5 · 1990");
newMap.addLayer(newImage, {bands: ["SR_B4", "SR_B3", "SR_B2"], min: 0, max: 0.3}, "Landsat 9 · 2024");
newMap.addLayer(gainedWater, {palette: ["29b6f6"]}, "Water gain", true, 0.8);
newMap.addLayer(lostWater, {palette: ["ff7043"]}, "Water loss", true, 0.8);
ui.Map.Linker([oldMap, newMap], "change-bounds");
var wipe = ui.SplitPanel({firstPanel: oldMap, secondPanel: newMap, wipe: true, angle: -18, style: {stretch: "both"}});
ui.root.clear();
ui.root.add(wipe);
