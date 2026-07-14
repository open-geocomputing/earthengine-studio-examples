# Earth Engine Python API and Map bridge smoke test.
import ee

vienna = ee.Geometry.Point([16.3738, 48.2082])
collection = (ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(vienna)
    .filterDate("2024-06-01", "2024-07-01")
    .sort("CLOUDY_PIXEL_PERCENTAGE"))

image = collection.mosaic()
Map.addLayer(
    image.select(["B4", "B3", "B2"]),
    {"bands": ["B4", "B3", "B2"], "min": 0, "max": 3000},
    "Python Sentinel-2 true color",
)

print("Python collection", collection)
print("Python image count", collection.size())
