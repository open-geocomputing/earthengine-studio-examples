// Plotly and Earth Engine ui.Chart examples.
var interactive = ui.Plotly({
  name: "Interactive Plotly scatter",
  data: [{
    type: "scatter",
    mode: "markers+lines",
    x: [1, 2, 3, 4],
    y: [2, 5, 3, 7],
    marker: {size: 11, color: [10, 20, 30, 40], colorscale: "Viridis"}
  }],
  layout: {title: {text: "Native Plotly figure"}}
});

interactive.on("plotly_click", function (event, figure) {
  var point = event.points[0];
  figure.relayout({"annotations[0]": {
    x: point.x, y: point.y, text: "Selected", showarrow: true
  }});
});
interactive.show();

var vienna = ee.Geometry.Point([16.3738, 48.2082]);
var collection = ee.ImageCollection("MODIS/061/MOD13Q1")
  .filterBounds(vienna)
  .filterDate("2024-01-01", "2024-07-01")
  .select(["NDVI"]);

var chart = ui.Chart.image.series({
  imageCollection: collection,
  region: vienna,
  reducer: ee.Reducer.mean(),
  scale: 250,
  xProperty: "system:time_start"
}).setSeriesNames(["NDVI"])
  .setOptions({title: "Stored for compatibility; Plotly styling is used"});

chart.onClick(function (x, y, series) {
  print("Chart selection", x, y, series);
});
print(chart);
