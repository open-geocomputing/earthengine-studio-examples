// Map layer display smoke test.
var vienna = ee.Geometry.Point([16.3738, 48.2082]);

var image = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(vienna)
  .filterDate("2024-06-01", "2024-09-01")
  .sort("CLOUDY_PIXEL_PERCENTAGE")
  .mosaic();

Map.addLayer(
  image.select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0, max: 3000 },
  "70 percent opacity",
  true,
  0.7
);

Map.addLayer(
  image.select(["B8", "B4", "B3"]),
  { bands: ["B8", "B4", "B3"], min: 0, max: 3000 },
  "False color hidden",
  false,
  0.45
);

print("Map layers requested");
