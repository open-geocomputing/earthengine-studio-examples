// Step 1: publish JavaScript values for Python.
var javascriptOffset = 11;

function javascriptScale(value) {
  return value * 3;
}

print("JavaScript bindings ready", javascriptOffset, javascriptScale(4));
