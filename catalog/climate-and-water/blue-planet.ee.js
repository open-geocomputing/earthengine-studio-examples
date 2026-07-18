/* global ee, Map, print */
// BLUE//PLANET — sea-surface temperature and animated HYCOM surface currents.
var temperature = ee.ImageCollection("NOAA/CDR/OISST/V2_1")
  .filterDate("2024-07-01", "2024-07-08")
  .select("sst")
  .mean()
  .multiply(0.01);
var current = ee.ImageCollection("HYCOM/sea_water_velocity")
  .filterDate("2024-07-01", "2024-07-03")
  .first()
  .select(["velocity_u_0", "velocity_v_0"])
  .multiply(0.001);

Map.setViewStyle("GLOBE", {stars: true, atmosphere: true, atmosphereBlend: 0.82});
Map.setCenter(-35, 20, 1.8);
Map.setOptions("BLUE_MARBLE");
Map.addLayer(temperature, {
  bands: ["sst"],
  min: -2,
  max: 32,
  computePixels: true,
  tileSize: 128,
  shader: "vec4(0.05 + normalized.r, 0.25 + 0.65 * sin(normalized.r * 3.14159), 1.0 - 0.75 * normalized.r, alpha * 0.74)"
}, "Sea-surface temperature");
Map.addLayer(current, {
  computePixels: true,
  renderer: "particles",
  bands: ["velocity_u_0", "velocity_v_0"],
  min: 0,
  max: 2,
  palette: ["7dd3fc", "f0f9ff", "fde047", "fb7185"],
  interpolation: "bilinear",
  particleDensity: 420,
  speedFactor: 12,
  frameRate: 60,
  trailLength: 90
}, "HYCOM surface currents");
print("Ocean snapshot", "1–7 July 2024 temperature with HYCOM surface currents");
