// Earth Engine image collection example with a map layer.
var vienna = ee.Geometry.Point([16.3738, 48.2082]);

var sentinel2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(vienna)
  .filterDate("2024-06-01", "2024-09-01")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
  .map(function (image) {
    var ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI");

    return image
      .addBands(ndvi)
      .set("summary", "summer clear-sky candidate");
  })
  .sort("CLOUDY_PIXEL_PERCENTAGE");

var firstClearImage = sentinel2.mosaic();

Map.addLayer(
  firstClearImage.select(["B4", "B3", "B2"]),
  { bands: ["B4", "B3", "B2"], min: 0, max: 3000 },
  "Sentinel-2 true color",
  true,
  0.7
);

print("Loaded collection", "COPERNICUS/S2_SR_HARMONIZED");
print("Filtered image count", sentinel2.size());
print("Scene ids", sentinel2.limit(4).aggregate_array("system:index"));
print("Cloud percentages", sentinel2.limit(4).aggregate_array("CLOUDY_PIXEL_PERCENTAGE"));
print("First clear image", firstClearImage);
print("Selected bands from first 3", sentinel2.limit(3).select(["B4", "B8", "NDVI"]));
