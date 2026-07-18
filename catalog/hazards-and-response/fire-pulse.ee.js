/* global ee, ui, print */
// FIRE//PULSE — wind, active fire, and Sentinel-2 burn severity in one App.
var region = ee.Geometry.Rectangle([-118.72, 33.96, -118.42, 34.16], null, false);

function composite(start, end) {
  return ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(region)
    .filterDate(start, end)
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 35))
    .median()
    .clip(region);
}

var before = composite("2024-11-15", "2025-01-05");
var after = composite("2025-01-18", "2025-03-15");
var beforeNbr = before.normalizedDifference(["B8", "B12"]);
var afterNbr = after.normalizedDifference(["B8", "B12"]);
var severity = beforeNbr.subtract(afterNbr).rename("dNBR");
var burned = severity.gt(0.27).selfMask();

var fire = ee.ImageCollection("NASA/VIIRS/002/VNP14A1")
  .filterBounds(region)
  .filterDate("2025-01-07", "2025-01-13")
  .select("FireMask")
  .max()
  .gte(7)
  .selfMask();
var wind = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
  .filterDate("2025-01-08T12:00:00", "2025-01-08T13:00:00")
  .first()
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"]);

ui.App.setHeader({title: "FIRE//PULSE", subtitle: "Palisades fire · weather, detection, and impact"});
ui.App.setCss([
  ".fire-strip { gap: 18px; padding: 10px 14px; background: #170c12; color: #ffe8dd; }",
  ".fire-accent { color: #ff7043; font-weight: 700; }"
].join("\n"));

var natural = {bands: ["B4", "B3", "B2"], min: 200, max: 3200, gamma: 1.1};
var beforeMap = ui.Map({name: "Before", lon: -118.55, lat: 34.06, zoom: 11});
var impactMap = ui.Map({name: "Impact", lon: -118.55, lat: 34.06, zoom: 11});
beforeMap.setCenter(-118.55, 34.06, 11);
impactMap.setCenter(-118.55, 34.06, 11);
beforeMap.addLayer(before, natural, "Before fire");
impactMap.addLayer(after, natural, "After fire");
impactMap.addLayer(severity, {min: 0.1, max: 0.8, palette: ["fff7bc", "fe9929", "cc4c02", "4a001f"]}, "Burn severity", true, 0.78);
impactMap.addLayer(fire, {palette: ["fff59d", "ff3d00"]}, "VIIRS active fire", true, 0.95);
impactMap.addLayer(wind, {
  computePixels: true,
  renderer: "arrows",
  bands: ["u_component_of_wind_10m", "v_component_of_wind_10m"],
  min: 0,
  max: 22,
  palette: ["7ad7ff", "fff176", "ff7043"],
  arrowSpacing: 48,
  arrowWidth: 2,
  arrowScale: "sqrt"
}, "ERA5-Land wind", false);
ui.Map.Linker([beforeMap, impactMap], "change-bounds");

var burnedArea = ee.Number(burned.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: region,
  scale: 30,
  maxPixels: 1e8
}).get("dNBR")).divide(1e6);
print("Estimated area above dNBR 0.27 (km²)", burnedArea);

var strip = ui.Panel({
  widgets: [
    ui.Label({value: "IMPACT RECONSTRUCTION", className: "fire-accent"}),
    ui.Label("Enable ERA5-Land wind in the layer drawer to reveal the weather field.")
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
  className: "fire-strip"
});
var wipe = ui.SplitPanel({firstPanel: beforeMap, secondPanel: impactMap, wipe: true, angle: 28, style: {stretch: "both"}});
ui.root.clear();
ui.root.add(ui.Panel({widgets: [strip, wipe], layout: ui.Panel.Layout.flow("vertical"), style: {stretch: "both"}}));
