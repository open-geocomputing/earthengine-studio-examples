/* global ee, Map, print */
// AIR//QUALITY GLOBE — Sentinel-5P NO2 beneath equal-area ERA5 wind arrows.
var no2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
  .filterDate("2024-01-10", "2024-01-25")
  .select("tropospheric_NO2_column_number_density")
  .mean();
var wind = ee.ImageCollection("ECMWF/ERA5/HOURLY")
  .filterDate("2024-01-18T12:00:00", "2024-01-18T13:00:00")
  .first()
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"]);

Map.setViewStyle("GLOBE", {stars: true, atmosphere: true, atmosphereBlend: 0.7});
Map.setCenter(12, 43, 2.7);
Map.setOptions("BLACK_MARBLE");
Map.addLayer(no2, {
  bands: ["tropospheric_NO2_column_number_density"],
  min: 0,
  max: 0.0002,
  computePixels: true,
  tileSize: 128,
  shader: "vec4(smoothstep(0.08, 0.9, normalized.r), normalized.r * 0.35, 1.0 - normalized.r, alpha * smoothstep(0.04, 0.3, normalized.r))"
}, "Tropospheric NO₂ shader", true, 0.88);
Map.addLayer(wind, {
  computePixels: true,
  renderer: "arrows",
  bands: ["u_component_of_wind_10m", "v_component_of_wind_10m"],
  min: 0,
  max: 30,
  palette: ["6ee7ff", "f8fafc", "facc15"],
  arrowDistribution: "uniform",
  arrowSpacing: 56,
  arrowWidth: 2,
  arrowScale: "log"
}, "ERA5 wind arrows");
print("Atmospheric snapshot", "10–24 January 2024 NO₂ with 18 January wind");
