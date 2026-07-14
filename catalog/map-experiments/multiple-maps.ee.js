// Historical multi-map example from the dynamic-map-display branch.
// Uses ui.Map(...) plus per-map setViewStyle/addLayer support from that branch.
Map.setCenter(11.4041, 47.2692, 10);
Map.setViewStyle("2D");

var alpsMap = ui.Map({
  id: "alps-demo-map",
  name: "Alps demo",
  lat: 47.2692,
  lon: 11.4041,
  zoom: 11,
  pitch: 48,
  bearing: -22,
});

alpsMap.open();
alpsMap.setViewStyle("GLOBE", {
  stars: true,
  atmosphere: true,
  atmosphereBlend: 0.42,
});

var patagoniaMap = ui.Map({
  id: "patagonia-demo-map",
  name: "Patagonia demo",
  lat: -50.9423,
  lon: -73.05,
  zoom: 9.4,
  bearing: -18,
});

patagoniaMap.open();
patagoniaMap.setViewStyle("2D");

try {
  var alpsPoint = ee.Geometry.Point([11.4041, 47.2692]);
  var patagoniaPoint = ee.Geometry.Point([-73.05, -50.9423]);

  var alpsSentinel = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(alpsPoint)
    .filterDate("2024-06-01", "2024-09-30")
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
    .median();

  alpsMap.addLayer(
    alpsSentinel.select(["B4", "B3", "B2"]),
    { bands: ["B4", "B3", "B2"], min: 0, max: 3200, gamma: 1.08 },
    "Alps Sentinel-2 true color",
    true,
    0.82
  );

  var patagoniaSentinel = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(patagoniaPoint)
    .filterDate("2024-01-01", "2024-04-30")
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 35))
    .median();
  var patagoniaNdvi = patagoniaSentinel
    .normalizedDifference(["B8", "B4"])
    .rename("NDVI");

  patagoniaMap.addLayer(
    patagoniaNdvi,
    { min: -0.15, max: 0.75, palette: ["#355c7d", "#f8b195", "#2d6a4f"] },
    "Patagonia Sentinel-2 NDVI",
    true,
    0.78
  );
} catch (error) {
  print("Layer demo needs Earth Engine sign-in", error.message);
}

print("Opened maps", "Map", "Alps demo", "Patagonia demo");
