import sys

import ee

sys.path.insert(0, "./local_package")
from terrain.filters import mask_clouds

if not ee.data.is_initialized():
    print("Local Python package loaded; sign in to add its Earth Engine layer.")
else:
    image = mask_clouds(ee.Image.constant(1))
    Map.addLayer(image, {"min": 0, "max": 1}, "Local Python package")
