// Step 3: lazily import the Python bindings back into JavaScript.
print("Python function called by JavaScript", pythonAdd(20, 22));
print("Python variable read by JavaScript", pythonMessage);
print("Round-trip value", value_from_javascript);
