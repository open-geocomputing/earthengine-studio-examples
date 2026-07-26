// Local GeoJSON renderers work without an Earth Engine sign-in.
// The same visualization objects can be used with an ee.FeatureCollection.
var observations = {
  type: "FeatureCollection",
  features: [
    point(16.315, 48.205, 18, "West"),
    point(16.345, 48.218, 42, "Museum quarter"),
    point(16.372, 48.208, 100, "Center"),
    point(16.395, 48.221, 72, "Danube canal"),
    point(16.418, 48.235, 55, "East"),
    point(16.355, 48.245, 31, "North")
  ]
};

function point(lon, lat, value, label) {
  return {
    type: "Feature",
    geometry: {type: "Point", coordinates: [lon, lat]},
    properties: {value: value, label: label}
  };
}

Map.setCenter(16.37, 48.22, 11.5, {pitch: 42, bearing: -18});
Map.setOptions("HYBRID");

Map.addLayer(observations, {
  renderer: "heatmap",
  weightProperty: "value",
  weightRange: [0, 100],
  radius: 42,
  intensity: 1.25,
  palette: [
    "rgba(44,123,182,0)",
    "#2c7bb6",
    "#00a6ca",
    "#ffff8c",
    "#f03b20"
  ],
  opacity: 0.82,
  minZoom: 8,
  maxZoom: 16
}, "Observation heatmap");

var pulses = Map.addLayer(observations, {
  renderer: "animated-icon",
  size: 112,
  color: "#ffffff",
  pulseColor: "#ff3b30",
  duration: 1400,
  autoplay: true,
  // Leave false for normal visual decoration. Reduced-motion users start paused.
  essential: false
}, "Pulsing observation sites");

print("Animation handle", "Use pulses.pause() and pulses.play() in Console.");
