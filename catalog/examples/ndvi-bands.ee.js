// Add NDVI to a Sentinel-2 collection and inspect bands.
var point = ee.Geometry.Point([16.3738, 48.2082]);

var withNdvi = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(point)
  .filterDate("2024-06-01", "2024-09-01")
  .map(function (image) {
    var ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI");

    return image.addBands(ndvi);
  });

print("First image with NDVI", withNdvi.first());
print("Selected red, NIR, NDVI bands", withNdvi.limit(3).select(["B4", "B8", "NDVI"]));
