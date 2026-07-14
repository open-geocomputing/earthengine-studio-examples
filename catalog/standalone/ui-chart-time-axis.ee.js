/* global ui */
// Runnable without Earth Engine authentication.
// Numeric Earth Engine-style timestamps become readable Plotly date values.
var chart = ui.Chart([
  ["system:time_start", "NDVI"],
  [1704067200000, 0.31], // 2024-01-01T00:00:00Z
  [1706745600000, 0.44], // 2024-02-01T00:00:00Z
  [1709251200000, 0.57]  // 2024-03-01T00:00:00Z
]);

chart.setName("Automatic date axis");
chart.show();
