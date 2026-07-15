// Dynamic computePixels visualization curved over the MapLibre globe.
// The Earth Engine expression supplies raw pixels; Studio colors them in WebGL.
var coordinates = ee.Image.pixelLonLat();
var longitudeWave = coordinates
  .select("longitude")
  .multiply(Math.PI / 60)
  .sin();
var latitudeWave = coordinates
  .select("latitude")
  .multiply(Math.PI / 45)
  .cos();
var globeWave = longitudeWave
  .multiply(latitudeWave)
  .rename("wave");

Map.setViewStyle("GLOBE", {
  stars: true,
  atmosphere: true,
  atmosphereBlend: 0.65
});
Map.setCenter(12, 24, 2.2);

Map.addLayer(globeWave, {
  computePixels: true,
  bands: ["wave"],
  min: -1,
  max: 1,
  palette: ["#19204f", "#1f70b7", "#59d8c9", "#f4e66b", "#d7485f"],
  tileSize: 128
}, "Dynamic computePixels globe", true, 0.88);

print("Dynamic globe image", globeWave);
