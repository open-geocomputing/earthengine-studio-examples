// Combine Hybrid imagery, globe terrain, managed Earth Engine layers, and the
// asynchronous serializable MapLibre proxy.
var everest = [86.9250, 27.9881];
var dem = ee.ImageCollection("COPERNICUS/DEM/GLO30")
  .select("DEM")
  .mosaic();

Map.setCenter(everest[0], everest[1], 9.2, {
  pitch: 62,
  bearing: -28
});
Map.setOptions("HYBRID");
Map.setViewStyle("GLOBE", {
  terrain: dem,
  terrainExaggeration: 1.4,
  stars: true,
  atmosphere: true,
  atmosphereBlend: 0.58
});

Map.addLayer(dem, {
  min: 0,
  max: 8500,
  palette: ["#263238", "#786548", "#c9b98d", "#f5f1df", "#ffffff"]
}, "Elevation tint", true, 0.38);

var camps = {
  type: "FeatureCollection",
  features: [
    feature(86.8528, 28.0026, "North Base Camp", "#00d4ff"),
    feature(86.8659, 27.9881, "West approach", "#ffd166"),
    feature(86.9250, 27.9881, "Everest", "#ff4d6d")
  ]
};

function feature(lon, lat, name, color) {
  return {
    type: "Feature",
    geometry: {type: "Point", coordinates: [lon, lat]},
    properties: {name: name, color: color}
  };
}

var raw = Map.getMapLibre();

// Proxy commands preserve order even though their results are promises.
raw.addSource("everest-camps", {
  type: "geojson",
  data: camps
});
raw.addLayer({
  id: "everest-camps-circles",
  type: "circle",
  source: "everest-camps",
  paint: {
    "circle-radius": 7,
    "circle-color": ["get", "color"],
    "circle-stroke-color": "#ffffff",
    "circle-stroke-width": 2
  }
});
raw.addLayer({
  id: "everest-camps-labels",
  type: "symbol",
  source: "everest-camps",
  layout: {
    "text-field": ["get", "name"],
    "text-size": 13,
    "text-offset": [0, 1.3]
  },
  paint: {
    "text-color": "#ffffff",
    "text-halo-color": "#172126",
    "text-halo-width": 1.5
  }
});

raw.getState().then(function(state) {
  print("Serializable MapLibre state", state);
});

var stopClickListener = raw.on("click", function(event) {
  print("MapLibre click", event.lngLat);
});

print(
  "Proxy handles",
  "raw.setPaintProperty(...), raw.setGeoJSONData(...), raw.queryRenderedFeatures(...), stopClickListener(), raw.release()"
);
