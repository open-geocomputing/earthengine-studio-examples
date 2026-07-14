// Historical globe terrain imagery example from the dynamic-map-display branch.
var everest = ee.Geometry.Point([86.925, 27.9881]);
var terrainExaggeration = 1.7;

var glo30 = ee.ImageCollection("COPERNICUS/DEM/GLO30")
  .mosaic()
  .select("DEM")
  .unmask(0);

Map.setCenter(86.925, 27.9881, 9.2, {
  bearing: -32,
});

Map.setViewStyle("GLOBE", {
  stars: true,
  atmosphere: true,
  atmosphereBlend: 0.5,
  terrain: glo30,
  terrainExaggeration: terrainExaggeration,
});

var sentinel2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(everest)
  .filterDate("2024-10-01", "2024-12-15")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 25))
  .sort("CLOUDY_PIXEL_PERCENTAGE");

var landsat9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_TOA")
  .filterBounds(everest)
  .filterDate("2024-10-01", "2024-12-15")
  .filter(ee.Filter.lt("CLOUD_COVER", 35))
  .sort("CLOUD_COVER");

Map.addLayer(
  sentinel2.median().select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0, max: 3800, gamma: 1.08, tileSize: 256 },
  "Everest Sentinel-2 median true color",
  true,
  0.78
);

Map.addLayer(
  landsat9.median().select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0.02, max: 0.46, gamma: 1.08, tileSize: 256 },
  "Everest Landsat 9 median true color",
  false,
  0.72
);

print("Terrain view", "GLOBE");
print("Scene center", "Mount Everest, Himalaya");
print("GLO30 terrain image", glo30);
print("Sentinel-2 image count", sentinel2.size());
print("Landsat 9 image count", landsat9.size());
print("Terrain exaggeration", terrainExaggeration);
