/* global ee, Map, Export, print */
// Satellite Movie Factory — preview an NDVI animation and register a video task.
var region = ee.Geometry.Rectangle([35.0, -1.2, 37.4, 1.0], null, false);
var ndvi = ee.ImageCollection("MODIS/061/MOD13Q1")
  .filterBounds(region)
  .filterDate("2024-01-01", "2025-01-01")
  .select("NDVI")
  .map(function (image) {
    return image.multiply(0.0001)
      .visualize({min: 0, max: 0.85, palette: ["3b1f0b", "d8b365", "f6e8c3", "5ab4ac", "01665e"]})
      .copyProperties(image, ["system:time_start"]);
  });

Map.setCenter(36.2, -0.1, 7);
Map.addLayer(ndvi.first(), {}, "First animation frame");
Export.video.toDrive({
  collection: ndvi,
  description: "east_africa_ndvi_2024",
  folder: "earthengine-studio",
  fileNamePrefix: "east-africa-ndvi-2024",
  framesPerSecond: 6,
  dimensions: 720,
  region: region,
  maxFrames: 1000
});
print("Movie factory", "A video task is ready in Tasks. Review its configuration before submitting.");
print("Frames", ndvi.size());
