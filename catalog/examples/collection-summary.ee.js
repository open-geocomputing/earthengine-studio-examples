// Console-only image collection summary.
var vienna = ee.Geometry.Point([16.3738, 48.2082]);

var collection = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(vienna)
  .filterDate("2024-06-01", "2024-07-01")
  .sort("CLOUDY_PIXEL_PERCENTAGE");

print("Collection", collection);
print("Count", collection.size());
print("Scene ids", collection.limit(5).aggregate_array("system:index"));
print("Cloud percentages", collection.limit(5).aggregate_array("CLOUDY_PIXEL_PERCENTAGE"));
print("First image", collection.first());
