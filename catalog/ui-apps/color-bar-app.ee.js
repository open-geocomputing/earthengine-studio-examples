// Reuse one visualization object for a logarithmic map and its color bars.
var concentration = ee.Image.pixelLonLat()
  .select("longitude")
  .add(180)
  .divide(360)
  .multiply(Math.log(1000))
  .exp()
  .rename("concentration");

var concentrationVis = {
  min: 1,
  max: 1000,
  palette: ["081d58", "225ea8", "41b6c4", "ffffd9"],
  logScale: true
};

Map.setCenter(0, 20, 2);
Map.addLayer(concentration, concentrationVis, "Concentration");

// A horizontal bar with values above it, explicit ticks, and custom labels.
var customColorBar = ui.ColorBar({
  visParams: concentrationVis,
  orientation: "horizontal",
  side: "top",
  title: "Concentration (µg/m³) — custom ticks",
  ticks: [1, 10, 100, 1000],
  tickLabels: ["1", "10", "100", "1,000"],
  style: {
    position: "bottom-left",
    width: "300px"
  }
});

// A vertical bar demonstrates the opposite orientation, right-side values,
// the label alias, and logarithmic automatic tick generation.
var automaticColorBar = ui.ColorBar({
  visualization: concentrationVis,
  orientation: "vertical",
  valueSide: "right",
  label: "Concentration — automatic log ticks",
  autoTicks: true,
  tickCount: 4,
  style: {
    position: "top-right"
  }
});

Map.add(customColorBar);
Map.add(automaticColorBar);

// Color bars are mutable. For example:
// customColorBar.setSide("bottom");
// automaticColorBar.setTickCount(6);
