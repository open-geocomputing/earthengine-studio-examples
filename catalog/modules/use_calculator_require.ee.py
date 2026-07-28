import ee

calculator = require("./calculator.ee.js")

print(calculator.add(20, 22))
if not ee.data.is_initialized():
    print("Sign in and select an Earth Engine project to add the image layer.")
else:
    Map.addLayer(
        calculator.multiplyImage(ee.Image.constant(10), 2),
        {"min": 0, "max": 20},
        "JS required by Python",
    )
