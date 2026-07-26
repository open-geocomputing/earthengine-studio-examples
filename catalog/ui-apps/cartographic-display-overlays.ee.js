// Interactive showcase for Studio's special cartographic display overlays.
// These are viewport/map annotations, not Map.addLayer entries. In MapLibre,
// the grid, labels, text, and engraved creatures render in the geographic
// WebGL scene so they curve or drape correctly in globe and 3D modes.
ui.App.setHeader({
  title: "Cartographic display overlays",
  subtitle: "WebGL globe grid, full compass rose, scale styles, and engraved creatures"
});

ui.App.setCss([
  ".display-demo { background: #e8edf1; }",
  ".display-controls { flex-wrap: wrap; align-items: flex-end; gap: 8px 12px; padding: 10px 12px; background: rgba(255, 255, 255, 0.97); border-bottom: 1px solid #cbd2d8; }",
  ".display-field { gap: 3px; min-width: 112px; }",
  ".display-field-label { color: #59636d; font-size: 10px; font-weight: 700; text-transform: uppercase; }",
  ".display-field select { min-width: 112px; }",
  ".display-field input { min-width: 112px; }",
  ".grid-style-slider { min-width: 145px; }",
  ".display-toggle { min-width: 105px; }",
  ".bearing-field { min-width: 230px; flex: 1; }",
  ".bearing-readout { min-width: 92px; color: #39424c; font-size: 12px; font-weight: 700; }"
].join("\n"));

var overlayMap = ui.Map({
  name: "Cartographic overlay map",
  lon: 11.4,
  lat: 47.2,
  zoom: 5
});
overlayMap.setOptions("OSM");
overlayMap.setCenter(11.4, 47.2, 5, {bearing: 28});
overlayMap.setControlVisibility({
  layerList: false,
  drawingToolsControl: false,
  scaleControl: true
});

var display = {
  orientationIndicator: {
    visible: true,
    position: "top-center",
    style: "compass",
    size: 78
  },
  graticule: {
    visible: true,
    labels: "border",
    color: "#263746",
    labelColor: "#17212b",
    labelSize: 12,
    opacity: 0.48,
    lineWidth: 1
  },
  scaleBar: {
    visible: true,
    position: "bottom-right",
    style: "checker",
    units: "dual",
    orientation: "horizontal",
    unitSide: "end",
    dynamic: true,
    subdivisions: [1, 2, 5],
    maxSize: 150
  },
  decorations: [
    {kind: "dragon", coordinates: [11.4, 47.2], size: 108},
    {kind: "lion", coordinates: [7.4, 46.9], size: 82},
    // "snake" is accepted as a friendly alias of "serpent".
    {kind: "snake", coordinates: [14.5, 47.0], size: 88},
    {
      kind: "text",
      coordinates: [9.5, 45.8],
      text: "Hic sunt dracones",
      color: "#6d4023",
      size: 17
    }
  ]
};

var allDecorations = display.decorations;

function applyDisplay() {
  overlayMap.setDisplayOptions(display);
}

function field(label, widget, extraClass) {
  return ui.Panel({
    widgets: [
      ui.Label({value: label, className: "display-field-label"}),
      widget
    ],
    layout: ui.Panel.Layout.flow("vertical"),
    className: "display-field" + (extraClass ? " " + extraClass : "")
  });
}

var indicatorStyle = ui.Select({
  items: ["arrow", "compass", "star"],
  value: display.orientationIndicator.style,
  onChange: function (style) {
    display.orientationIndicator.style = style;
    applyDisplay();
  }
});

var gridLabels = ui.Select({
  items: ["border", "axes", "all", "none"],
  value: display.graticule.labels,
  onChange: function (labels) {
    display.graticule.labels = labels;
    applyDisplay();
  }
});

function updateHexColor(value, target) {
  var color = String(value).trim();
  if (!/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color)) {
    print("Grid colors use #RGB, #RRGGBB, or #RRGGBBAA.");
    return;
  }
  display.graticule[target] = color;
  applyDisplay();
}

var gridLineColor = ui.Textbox({
  placeholder: "#RRGGBB",
  value: display.graticule.color,
  onChange: function (color) {
    updateHexColor(color, "color");
  }
});

var gridLabelColor = ui.Textbox({
  placeholder: "#RRGGBB",
  value: display.graticule.labelColor,
  onChange: function (color) {
    updateHexColor(color, "labelColor");
  }
});

var gridLineWidth = ui.Slider({
  min: 0.25,
  max: 6,
  value: display.graticule.lineWidth,
  step: 0.25,
  onSlide: function (width) {
    display.graticule.lineWidth = width;
    applyDisplay();
  },
  className: "grid-style-slider"
});

var gridLabelSize = ui.Slider({
  min: 8,
  max: 32,
  value: display.graticule.labelSize,
  step: 1,
  onSlide: function (size) {
    display.graticule.labelSize = size;
    applyDisplay();
  },
  className: "grid-style-slider"
});

var scaleStyle = ui.Select({
  items: ["u", "ticks", "alternating", "checker"],
  value: display.scaleBar.style,
  onChange: function (style) {
    display.scaleBar.style = style;
    applyDisplay();
  }
});

var scaleUnits = ui.Select({
  items: ["metric", "imperial", "nautical", "dual"],
  value: display.scaleBar.units,
  onChange: function (units) {
    display.scaleBar.units = units;
    applyDisplay();
  }
});

var scaleOrientation = ui.Select({
  items: ["horizontal", "vertical"],
  value: display.scaleBar.orientation,
  onChange: function (orientation) {
    display.scaleBar.orientation = orientation;
    applyDisplay();
  }
});

var scalePosition = ui.Select({
  items: [
    "top-left",
    "top-center",
    "top-right",
    "center-left",
    "center-right",
    "bottom-left",
    "bottom-center",
    "bottom-right"
  ],
  value: display.scaleBar.position,
  onChange: function (position) {
    display.scaleBar.position = position;
    applyDisplay();
  }
});

var unitSide = ui.Select({
  items: ["start", "end"],
  value: display.scaleBar.unitSide,
  onChange: function (side) {
    display.scaleBar.unitSide = side;
    applyDisplay();
  }
});

var viewStyle = ui.Select({
  items: ["2D", "GLOBE", "3D"],
  value: "2D",
  onChange: function (mode) {
    overlayMap.setViewStyle(mode, {
      stars: mode === "GLOBE",
      atmosphere: mode === "GLOBE"
    });
  }
});

var dynamicScale = ui.Checkbox({
  label: "Pointer scale",
  value: display.scaleBar.dynamic,
  onChange: function (enabled) {
    display.scaleBar.dynamic = enabled;
    applyDisplay();
  },
  className: "display-toggle"
});

var showScale = ui.Checkbox({
  label: "Show scale",
  value: display.scaleBar.visible,
  onChange: function (visible) {
    display.scaleBar.visible = visible;
    applyDisplay();
  },
  className: "display-toggle"
});

var showNorth = ui.Checkbox({
  label: "Show north",
  value: display.orientationIndicator.visible,
  onChange: function (visible) {
    display.orientationIndicator.visible = visible;
    applyDisplay();
  },
  className: "display-toggle"
});

var showGrid = ui.Checkbox({
  label: "Show grid",
  value: display.graticule.visible,
  onChange: function (visible) {
    display.graticule.visible = visible;
    applyDisplay();
  },
  className: "display-toggle"
});

var showDecorations = ui.Checkbox({
  label: "Dragons & friends",
  value: true,
  onChange: function (visible) {
    display.decorations = visible ? allDecorations : [];
    applyDisplay();
  },
  className: "display-toggle"
});

var bearingReadout = ui.Label({
  value: "Bearing: 28°",
  className: "bearing-readout"
});

var bearingSlider = ui.Slider({
  min: -180,
  max: 180,
  value: 28,
  step: 1,
  onSlide: function (bearing) {
    overlayMap.setCenter(11.4, 47.2, 5, {bearing: bearing});
    bearingReadout.setValue("Bearing: " + bearing + "°");
  },
  style: {stretch: "horizontal"}
});

var controls = ui.Panel({
  widgets: [
    field("View", viewStyle),
    field("North symbol", indicatorStyle),
    field("Grid labels", gridLabels),
    field("Line color", gridLineColor),
    field("Line width (px)", gridLineWidth),
    field("Text color", gridLabelColor),
    field("Text size (px)", gridLabelSize),
    field("Scale style", scaleStyle),
    field("Units", scaleUnits),
    field("Layout", scaleOrientation),
    field("Position", scalePosition),
    field("Unit side", unitSide),
    dynamicScale,
    showScale,
    showNorth,
    showGrid,
    showDecorations,
    field("Rotate map", ui.Panel({
      widgets: [bearingReadout, bearingSlider],
      layout: ui.Panel.Layout.flow("horizontal")
    }), "bearing-field")
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
  className: "display-controls"
});

applyDisplay();

ui.root.clear();
ui.root.add(ui.Panel({
  widgets: [controls, overlayMap],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {stretch: "both"},
  className: "display-demo"
}));

print("Special display overlays are separate from Map.addLayer layers.");
print("Move the pointer over the map to update the dynamic scale latitude.");
