// Compare two basemaps while ui.Map.Linker keeps both viewports synchronized.
ui.App.setHeader({
  title: "Linked-map comparison",
  subtitle: "Pan or zoom either map; the other map follows"
});

var leftMap = ui.Map({
  name: "Linked streets",
  lon: 11.39,
  lat: 47.27,
  zoom: 8
});
leftMap.setOptions("OSM");

var rightMap = ui.Map({
  name: "Linked satellite",
  lon: 11.39,
  lat: 47.27,
  zoom: 8
});
rightMap.setOptions("SATELLITE");

// Keep this handle if the script later needs to add or remove linked maps.
var linker = ui.Map.Linker([leftMap, rightMap], "change-bounds");

var split = ui.SplitPanel({
  firstPanel: ui.Panel([
    ui.Label({value: "OpenStreetMap", style: {fontWeight: "bold"}}),
    leftMap
  ], ui.Panel.Layout.flow("vertical"), {stretch: "both"}),
  secondPanel: ui.Panel([
    ui.Label({value: "Satellite", style: {fontWeight: "bold"}}),
    rightMap
  ], ui.Panel.Layout.flow("vertical"), {stretch: "both"}),
  orientation: "horizontal",
  wipe: false,
  style: {stretch: "both"}
});

ui.root.clear();
ui.root.add(split);
