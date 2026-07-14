// Local smoke test for Console rendering.
print("Scalar", 42);
print("Array", [1, 2, 3, { nested: true }]);
print("Object", {
  name: "console rendering smoke",
  ok: true,
  nested: {
    values: ["red", "green", "blue"],
  },
});
