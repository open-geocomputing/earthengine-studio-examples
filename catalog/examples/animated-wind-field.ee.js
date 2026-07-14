// Animated 10 m wind from an Earth Engine U/V image snapshot.
// Add a natural-color land surface first so the wind overlay has geographic context.
var landSurface = ee.ImageCollection("MODIS/061/MCD43A4")
  .filterDate("2024-06-28", "2024-07-04")
  .median()
  .select([
    "Nadir_Reflectance_Band1",
    "Nadir_Reflectance_Band4",
    "Nadir_Reflectance_Band3"
  ]);

var globalWind = ee.ImageCollection("ECMWF/ERA5/HOURLY")
  .filterDate("2024-07-01T12:00:00", "2024-07-01T13:00:00")
  .first()
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"]);

var landWind = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
  .filterDate("2024-07-01T12:00:00", "2024-07-01T13:00:00")
  .first()
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"]);

Map.setCenter(11.4, 47.3, 6);
Map.addLayer(landSurface, {
  bands: [
    "Nadir_Reflectance_Band1",
    "Nadir_Reflectance_Band4",
    "Nadir_Reflectance_Band3"
  ],
  min: 0,
  max: 4000,
  gamma: 1.15
}, "MODIS natural-color land surface", true, 0.9);

Map.addLayer(globalWind, {
  computePixels: true,
  renderer: "arrows",
  bands: ["u_component_of_wind_10m", "v_component_of_wind_10m"],
  min: 0,
  max: 25,
  palette: ["#00d4ff", "#29ff87", "#ffe14a", "#ff4d3d"],
  interpolation: "bilinear",
  arrowPlacement: "relative",
  arrowSpacing: 52,
  arrowWidth: 2.5,
  arrowLength: 1,
  arrowScale: "log"
}, "ERA5 10 m wind arrows");

var particleStyle = {
  computePixels: true,
  renderer: "particles",
  bands: ["u_component_of_wind_10m", "v_component_of_wind_10m"],
  min: 0,
  max: 25,
  palette: ["#00d4ff", "#29ff87", "#ffe14a", "#ff4d3d"],
  interpolation: "bilinear",
  particleDensity: 500,
  speedFactor: 10,
  frameRate: 60,
  trailLength: 100
};

// Coverage selector: use the layer drawer eyes to enable Global or Land.
// Both remain available at display time without rerunning this script.
Map.addLayer(landWind, particleStyle, "Wind source: ERA5-Land", false);
Map.addLayer(globalWind, particleStyle, "Wind source: Global ERA5", true);
