// Historical SCENE3D terrain example from the dynamic-map-display branch.
var innsbruck = ee.Geometry.Point([11.4041, 47.2692]);
var terrainExaggeration = 1.6;

var glo30 = ee.ImageCollection("COPERNICUS/DEM/GLO30")
  .mosaic()
  .select("DEM")
  .unmask(0);

Map.setCenter(11.4041, 47.2692, 12, {
  pitch: 62,
  bearing: -25,
});

Map.setViewStyle("SCENE3D", {
  terrain: glo30,
  terrainExaggeration: terrainExaggeration,
});

var sentinel2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(innsbruck)
  .filterDate("2024-06-01", "2024-09-30")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 18))
  .sort("CLOUDY_PIXEL_PERCENTAGE");

Map.addLayer(
  sentinel2.median().select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0, max: 3200, gamma: 1.08, tileSize: 256 },
  "Innsbruck Sentinel-2 median true color",
  true,
  0.82
);

print("Terrain view", "SCENE3D");
print("Scene center", "Innsbruck, Austria");
print("GLO30 terrain image", glo30);
print("Sentinel-2 image count", sentinel2.size());
print("Terrain exaggeration", terrainExaggeration);
