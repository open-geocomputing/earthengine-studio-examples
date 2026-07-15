// Studio extends wipe-mode ui.SplitPanel with a draggable custom angle.
ui.App.setHeader({
  title: "Angled SplitPanel",
  subtitle: "Drag the diagonal divider or change its angle with the slider"
});

ui.App.setCss([
  ".angle-controls { align-items: center; gap: 12px; padding: 10px 14px; background: #f8fafd; border-bottom: 1px solid #dadce0; }",
  ".angle-readout { min-width: 150px; font-weight: 600; }"
].join("\n"));

var streets = ui.Map({
  name: "Angled streets",
  lon: 11.39,
  lat: 47.27,
  zoom: 8
});
streets.setOptions("OSM");

var satellite = ui.Map({
  name: "Angled satellite",
  lon: 11.39,
  lat: 47.27,
  zoom: 8
});
satellite.setOptions("SATELLITE");

// Linking keeps the imagery aligned while either map is panned or zoomed.
var linker = ui.Map.Linker([streets, satellite], "change-bounds");

var comparison = ui.SplitPanel({
  firstPanel: streets,
  secondPanel: satellite,
  orientation: "horizontal",
  wipe: true,
  angle: 30,
  style: {stretch: "both"}
});

var angleReadout = ui.Label({
  value: "Divider angle: 30°",
  className: "angle-readout"
});

var angleSlider = ui.Slider({
  min: -70,
  max: 70,
  value: 30,
  step: 1,
  onSlide: function (angle) {
    comparison.setAngle(angle);
    angleReadout.setValue("Divider angle: " + angle + "°");
  },
  style: {stretch: "horizontal"}
});

var controls = ui.Panel({
  widgets: [angleReadout, angleSlider],
  layout: ui.Panel.Layout.flow("horizontal"),
  className: "angle-controls"
});

ui.root.clear();
ui.root.add(ui.Panel({
  widgets: [controls, comparison],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {stretch: "both"}
}));
