# Step 2: lazily import JavaScript bindings and publish Python bindings.
try:
    _javascript_scale = javascriptScale
    _javascript_offset = javascriptOffset
    print("Using JavaScript bindings published by step 1")
except NameError:
    print("Step 1 has not run; using its documented values for a standalone run")
    _javascript_offset = 11

    def _javascript_scale(value):
        return value * 3

value_from_javascript = _javascript_scale(7) + _javascript_offset

def pythonAdd(left, right):
    return left + right

pythonMessage = "Hello from Python"

print("JavaScript function called by Python", _javascript_scale(7))
print("JavaScript variable read by Python", _javascript_offset)
print("Combined in Python", value_from_javascript)
