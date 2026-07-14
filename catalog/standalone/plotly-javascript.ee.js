/* global ui */
// Runnable without Earth Engine authentication.
// It demonstrates a named Plotly tab, event callbacks, and incremental updates.
var figure = ui.Plotly({
  name: "JavaScript Plotly example",
  data: [{
    type: "scatter",
    mode: "lines+markers",
    x: [1, 2, 3],
    y: [2, 5, 3],
    name: "observations"
  }],
  layout: {
    title: {text: "Interactive JavaScript figure"},
    xaxis: {title: {text: "Sample"}},
    yaxis: {title: {text: "Value"}}
  },
  config: {scrollZoom: true}
});

figure.on("plotly_click", function (event, currentFigure) {
  var point = event.points[0];
  currentFigure.relayout({
    "annotations[0]": {
      x: point.x,
      y: point.y,
      text: "Selected " + point.y,
      showarrow: true
    }
  });
});

figure.show();
figure.extendTraces({x: [[4]], y: [[7]]}, [0]);
