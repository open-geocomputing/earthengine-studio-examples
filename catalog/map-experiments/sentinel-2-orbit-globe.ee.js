// Historical globe example from the dynamic-map-display branch.
// Uses the scriptable Map.setViewStyle API from that branch.
var orbitNumber = 22;

Map.setViewStyle("GLOBE", {
  stars: true,
  atmosphere: true,
  atmosphereBlend: 0.45,
});

var singleOrbit = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterDate("2024-04-12", "2024-04-13")
  .filter(ee.Filter.eq("SENSING_ORBIT_NUMBER", orbitNumber));

var orbitImage = singleOrbit.mosaic();

Map.addLayer(
  orbitImage.select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0, max: 3000, gamma: 1.08, tileSize: 256 },
  "Sentinel-2 orbit " + orbitNumber,
  true,
  0.85
);

print("Sentinel-2 orbit number", orbitNumber);
print("Single-orbit image count", singleOrbit.size());
print("Orbit scene ids", singleOrbit.aggregate_array("system:index"));
print("Orbit tiles", singleOrbit.aggregate_array("MGRS_TILE"));
