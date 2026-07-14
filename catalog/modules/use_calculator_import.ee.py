import ee
import calculator

print(calculator.add(20, 22))

scaled = calculator.multiplyImage(ee.Image.constant(10), 2)
Map.addLayer(scaled, {"min": 0, "max": 20}, "JS called by Python")
