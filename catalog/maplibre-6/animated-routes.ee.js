// Progressively reveal LineString and MultiLineString features.
var journey = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {name: "Alpine crossing"},
      geometry: {
        type: "LineString",
        coordinates: [
          [10.90, 47.27],
          [11.18, 47.20],
          [11.40, 47.27],
          [11.67, 47.31],
          [11.93, 47.36]
        ]
      }
    },
    {
      type: "Feature",
      properties: {name: "Two approach branches"},
      geometry: {
        type: "MultiLineString",
        coordinates: [
          [[11.40, 47.27], [11.52, 47.48], [11.71, 47.60]],
          [[11.40, 47.27], [11.26, 47.05], [11.10, 46.92]]
        ]
      }
    }
  ]
};

Map.setCenter(11.4, 47.27, 8.4, {pitch: 48, bearing: -20});
Map.setOptions("HYBRID");

var routeAnimation = Map.addLayer(journey, {
  renderer: "animated-line",
  color: "#00d4ff",
  width: 5,
  duration: 6500,
  loop: true,
  autoplay: true,
  essential: false
}, "Animated Alpine routes");

print(
  "Playback",
  "Use the layer-card controls, or routeAnimation.pause()/play()/unlisten()."
);
