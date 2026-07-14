import sys

import ee

sys.path.insert(0, "./local_package")
from terrain.filters import mask_clouds

image = mask_clouds(ee.Image.constant(1))
Map.addLayer(image, {"min": 0, "max": 1}, "Local Python package")
