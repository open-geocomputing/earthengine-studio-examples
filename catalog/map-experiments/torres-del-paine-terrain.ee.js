// Historical globe terrain imagery example from the dynamic-map-display branch.
var torresDelPaine = ee.Geometry.Point([-73.05, -50.9423]);
var terrainExaggeration = 1.8;

var glo30 = ee.ImageCollection("COPERNICUS/DEM/GLO30")
  .mosaic()
  .select("DEM")
  .unmask(0);

Map.setCenter(-73.05, -50.9423, 9.4, {
  bearing: -18,
});

Map.setViewStyle("GLOBE", {
  stars: true,
  atmosphere: true,
  atmosphereBlend: 0.52,
  terrain: glo30,
  terrainExaggeration: terrainExaggeration,
});

var sentinel2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(torresDelPaine)
  .filterDate("2024-01-01", "2024-04-30")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 35))
  .sort("CLOUDY_PIXEL_PERCENTAGE");

var landsat9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_TOA")
  .filterBounds(torresDelPaine)
  .filterDate("2024-01-01", "2024-04-30")
  .filter(ee.Filter.lt("CLOUD_COVER", 45))
  .sort("CLOUD_COVER");

Map.addLayer(
  sentinel2.median().select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0, max: 3500, gamma: 1.05, tileSize: 256 },
  "Torres del Paine Sentinel-2 median true color",
  true,
  0.78
);

Map.addLayer(
  landsat9.median().select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0.02, max: 0.42, gamma: 1.05, tileSize: 256 },
  "Torres del Paine Landsat 9 median true color",
  false,
  0.72
);

print("Terrain view", "GLOBE");
print("Scene center", "Torres del Paine, Patagonian Andes");
print("GLO30 terrain image", glo30);
print("Sentinel-2 image count", sentinel2.size());
print("Landsat 9 image count", landsat9.size());
print("Terrain exaggeration", terrainExaggeration);
