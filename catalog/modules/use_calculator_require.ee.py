import ee

calculator = require("./calculator.ee.js")

print(calculator.add(20, 22))
Map.addLayer(
    calculator.multiplyImage(ee.Image.constant(10), 2),
    {"min": 0, "max": 20},
    "JS required by Python",
)
