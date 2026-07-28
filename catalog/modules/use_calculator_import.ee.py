import ee
import calculator

print(calculator.add(20, 22))

if not ee.data.is_initialized():
    print("Sign in and select an Earth Engine project to add the image layer.")
else:
    scaled = calculator.multiplyImage(ee.Image.constant(10), 2)
    Map.addLayer(scaled, {"min": 0, "max": 20}, "JS called by Python")
