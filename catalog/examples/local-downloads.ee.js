/* global ee, Export, print */
// Small authenticated test for Studio's high-volume local downloads.
// Run this script, open Tasks > Local downloads, and start each row.
// Choose a separate empty folder for the image and table manifests.
// In the task dialog, select ZIP download to test the picker-free alternative.
// Raster tasks also expose Pixel type and Chunk dimensions controls.

var area = ee.Geometry.Rectangle([16.36, 48.20, 16.38, 48.215], null, false);

var elevation = ee.Image("USGS/SRTMGL1_003")
  .select("elevation")
  .clip(area);

Export.image.toFolder({
  image: elevation,
  description: "vienna_elevation_test",
  region: area,
  scale: 90,
  bands: ["elevation"],
  maxConcurrency: 2
});

var samplePoints = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([16.365, 48.205]), {id: "west", class: 1}),
  ee.Feature(ee.Geometry.Point([16.372, 48.210]), {id: "center", class: 2}),
  ee.Feature(ee.Geometry.Point([16.377, 48.213]), {id: "east", class: 3})
]);

Export.table.toFolder({
  collection: samplePoints,
  description: "vienna_sample_points_test",
  selectors: ["id", "class"],
  pageSize: 2
});

Map.setCenter(16.37, 48.2075, 13);
Map.addLayer(elevation, {min: 150, max: 500}, "Elevation test area");
print("Two local downloads registered. Start them from Tasks > Local downloads.");
