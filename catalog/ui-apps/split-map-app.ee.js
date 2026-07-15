// Compose multiple independent ui.Map widgets in one App.
ui.App.setHeader({
  title: "Two-map comparison",
  subtitle: "Independent maps inside a horizontal SplitPanel"
});

var alps = ui.Map({
  id: "ui-apps-alps-map",
  name: "Alps",
  lon: 11.4041,
  lat: 47.2692,
  zoom: 9
});

var patagonia = ui.Map({
  id: "ui-apps-patagonia-map",
  name: "Patagonia",
  lon: -73.05,
  lat: -50.9423,
  zoom: 8
});

alps.setCenter(11.4041, 47.2692, 9);
patagonia.setCenter(-73.05, -50.9423, 8);

alps.add(ui.Label({
  value: "European Alps",
  style: {position: "top-left", padding: "8px", backgroundColor: "white"}
}));
patagonia.add(ui.Label({
  value: "Patagonia",
  style: {position: "top-left", padding: "8px", backgroundColor: "white"}
}));

var comparison = ui.SplitPanel({
  firstPanel: alps,
  secondPanel: patagonia,
  orientation: "horizontal",
  wipe: false,
  style: {stretch: "both"}
});

ui.root.clear();
ui.root.add(comparison);
