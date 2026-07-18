/* global ee, ui, print */
// CORAL//REEF LENS — linked Sentinel-2 and Allen Coral Atlas habitat maps.
var reef = ee.Geometry.Point([147.7, -18.4]);
var imagery = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(reef)
  .filterDate("2023-05-01", "2023-10-31")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
  .median();
var habitat = ee.Image("ACA/reef_habitat/v2_0");

ui.App.setHeader({title: "CORAL//REEF LENS", subtitle: "Great Barrier Reef imagery and benthic habitat"});
var imageMap = ui.Map({name: "Satellite", lon: 147.7, lat: -18.4, zoom: 10});
var habitatMap = ui.Map({name: "Habitat", lon: 147.7, lat: -18.4, zoom: 10});
imageMap.setCenter(147.7, -18.4, 10);
habitatMap.setCenter(147.7, -18.4, 10);
imageMap.addLayer(imagery, {bands: ["B2", "B3", "B4"], min: 150, max: 2600, gamma: 1.15}, "Sentinel-2 reef");
habitatMap.addLayer(imagery, {bands: ["B4", "B3", "B2"], min: 150, max: 2600}, "Satellite context", true, 0.5);
habitatMap.addLayer(habitat.select("benthic"), {min: 11, max: 18, palette: ["fff7bc", "fdae61", "8c6d31", "66bd63", "d7191c", "2c7bb6", "7b3294"]}, "Benthic habitat", true, 0.82);
ui.Map.Linker([imageMap, habitatMap], "change-bounds");
ui.root.clear();
ui.root.add(ui.SplitPanel({firstPanel: imageMap, secondPanel: habitatMap, wipe: true, angle: -30, style: {stretch: "both"}}));
print("Inspector", "Click the benthic layer to read the mapped habitat class value.");
