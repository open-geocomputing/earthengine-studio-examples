// Local smoke test for collection filtering, sorting, and limits.
var point = ee.Geometry.Point([16.3738, 48.2082]);

var collection = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(point)
  .filterDate("2024-06-01", "2024-09-01")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 25))
  .sort("CLOUDY_PIXEL_PERCENTAGE");

print("Smoke count", collection.size());
print("Lowest cloud scenes", collection.limit(3).aggregate_array("system:index"));
print("Lowest cloud values", collection.limit(3).aggregate_array("CLOUDY_PIXEL_PERCENTAGE"));
print("Limited image collection", collection.limit(2));
