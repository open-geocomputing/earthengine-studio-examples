// Embed a native Plotly chart in an App alongside ordinary Earth Engine UI.
ui.App.setHeader({
  title: "Vegetation dashboard",
  subtitle: "An embedded chart with a Worker callback"
});

ui.App.setCss([
  ".chart-layout { padding: 18px; gap: 14px; }",
  ".chart-status { color: #174ea6; font-weight: 600; }"
].join("\n"));

var status = ui.Label({
  value: "Click a point in the chart.",
  className: "chart-status"
});

var chart = ui.Plotly({
  name: "Monthly vegetation index",
  data: [{
    type: "scatter",
    mode: "lines+markers",
    x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    y: [0.31, 0.36, 0.48, 0.62, 0.71, 0.76],
    marker: {size: 10, color: "#137333"},
    line: {color: "#137333", width: 3}
  }],
  layout: {
    title: {text: "Example NDVI profile"},
    xaxis: {title: {text: "Month"}},
    yaxis: {title: {text: "NDVI"}, range: [0, 1]}
  }
});

chart.on("plotly_click", function (event) {
  var point = event.points[0];
  status.setValue(point.x + " · NDVI " + point.y);
  print("Selected chart point", point.x, point.y);
});

var dashboard = ui.Panel({
  widgets: [chart, status],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {stretch: "both"},
  className: "chart-layout"
});

ui.root.clear();
ui.root.add(dashboard);
