# Step 2: lazily import JavaScript bindings and publish Python bindings.
value_from_javascript = javascriptScale(7) + javascriptOffset

def pythonAdd(left, right):
    return left + right

pythonMessage = "Hello from Python"

print("JavaScript function called by Python", javascriptScale(7))
print("JavaScript variable read by Python", javascriptOffset)
print("Combined in Python", value_from_javascript)
