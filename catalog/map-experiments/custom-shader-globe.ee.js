// A script-defined fragment-shader expression over Earth Engine pixels.
// Studio supplies the globe-aware vertex shader and safely injects this vec4 expression.
var temperature = ee.Image.pixelLonLat()
  .select("latitude")
  .multiply(0.3)
  .add(285)
  .rename("temperature");

Map.setViewStyle("GLOBE", {
  stars: true,
  atmosphere: true,
  atmosphereBlend: 0.72
});
Map.setCenter(10, 18, 2.1);

Map.addLayer(temperature, {
  bands: ["temperature"],
  min: 260,
  max: 315,
  tileSize: 128,
  shader: `vec4(
    normalized.r,
    smoothstep(0.15, 0.8, normalized.r),
    1.0 - normalized.r,
    0.55 + 0.45 * cos((mercator.y - 0.5) * 3.14159265)
  )`
}, "Temperature shader globe", true, 0.92);

print("Shader variables", {
  values: "raw band values",
  normalized: "band values scaled to 0-1",
  uv: "tile-local coordinates",
  mercator: "global Web Mercator coordinates"
});
