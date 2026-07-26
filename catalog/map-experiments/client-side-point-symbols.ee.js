// MapLibre client-side symbols: local GeoJSON and Earth Engine collections.
// Rotate, pitch, and pan the map to verify that labels stay upright and
// mountain symbols retain a horizontal screen-space base.
Map.setCenter(11.39, 47.27, 11, {
  bearing: -28,
  pitch: 58,
});

var localLabels = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "above",
      geometry: { type: "Point", coordinates: [11.34, 47.30] },
      properties: {
        label: "Above\nmultiline",
        symbol_type: "circle",
        label_position: "above",
        size: 13,
        min_zoom: 8,
        text_color: "#34261d",
      },
    },
    {
      type: "Feature",
      id: "below",
      geometry: { type: "Point", coordinates: [11.37, 47.29] },
      properties: {
        label: "Below",
        symbol_type: "circle",
        label_position: "below",
        size: 16,
        text_color: "#294c56",
      },
    },
    {
      type: "Feature",
      id: "left",
      geometry: { type: "Point", coordinates: [11.40, 47.28] },
      properties: {
        label: "Left",
        symbol_type: "mountain",
        label_position: "left",
        size: 23,
        symbol_color: "#755239",
      },
    },
    {
      type: "Feature",
      id: "right",
      geometry: { type: "Point", coordinates: [11.43, 47.27] },
      properties: {
        label: "Right",
        symbol_type: "mountain",
        label_position: "right",
        size: 30,
        symbol_color: "#8b6444",
        max_zoom: 16,
      },
    },
    {
      type: "Feature",
      id: "center",
      geometry: { type: "Point", coordinates: [11.46, 47.26] },
      properties: {
        label: "Centered",
        symbol_type: "none",
        label_position: "center",
        font_size: 16,
        text_color: "#5b1f24",
      },
    },
  ],
};

Map.addLayer(localLabels, {
  renderer: "symbols",
  symbol: {
    type: "circle",
    typeProperty: "symbol_type",
    size: 18,
    sizeProperty: "size",
    color: "#5b4636",
    colorProperty: "symbol_color",
  },
  label: {
    property: "label",
    position: "above",
    positionProperty: "label_position",
    fontFamily: "serif",
    fontSize: 14,
    fontSizeProperty: "font_size",
    scale: "zoom",
    color: "#2c2118",
    colorProperty: "text_color",
    effect: {
      type: "outline",
      color: "#fff7e7",
      width: 2,
    },
  },
  idProperty: "id",
  minZoom: 7,
  maxZoom: 18,
  featureMinZoomProperty: "min_zoom",
  featureMaxZoomProperty: "max_zoom",
  allowOverlap: false,
}, "Local positions and outline");

var shadowLabel = {
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    id: "shadow",
    geometry: { type: "Point", coordinates: [11.31, 47.255] },
    properties: { title: "Shadow label" },
  }],
};

Map.addLayer(shadowLabel, {
  renderer: "symbols",
  symbol: { type: "none" },
  label: {
    property: "title",
    position: "center",
    fontFamily: "monospace",
    fontSize: 15,
    color: "#fffaf0",
    effect: {
      type: "shadow",
      color: "#172027",
      offset: [2, 2],
      blur: 1,
    },
  },
  allowOverlap: true,
}, "Text shadow");

// This literal ee.FeatureCollection exercises the paginated, tile-bounded
// Earth Engine loader without depending on a user asset.
var remotePeaks = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([11.398, 47.306]), {
    name: "Hafelekar",
    marker_size: 34,
    marker_color: "#654735",
    label_side: "above",
    visible_from: 9,
  }),
  ee.Feature(ee.Geometry.Point([11.377, 47.288]), {
    name: "Seegrube",
    marker_size: 26,
    marker_color: "#7d5940",
    label_side: "below",
    visible_from: 10,
  }),
]);

Map.addLayer(remotePeaks, {
  renderer: "symbols",
  symbol: {
    type: "mountain",
    size: 24,
    sizeProperty: "marker_size",
    color: "#715139",
    colorProperty: "marker_color",
  },
  label: {
    property: "name",
    position: "above",
    positionProperty: "label_side",
    fontFamily: "sans",
    fontSize: 14,
    scale: "fixed",
    color: "#2a211a",
    effect: {
      type: "halo",
      color: "#f8f1df",
      width: 2,
    },
  },
  featureMinZoomProperty: "visible_from",
}, "Earth Engine mountain symbols");

print("Client symbols", "Pan across tile boundaries and rotate the pitched map.");
