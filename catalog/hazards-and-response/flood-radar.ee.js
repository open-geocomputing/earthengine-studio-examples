/* global ee, ui */
// FLOOD//RADAR — deterministic Sentinel-1 flood mapping over Sindh, Pakistan.
var region = ee.Geometry.Rectangle([67.2, 24.7, 69.8, 27.8], null, false);

function sentinel1(start, end) {
  return ee.ImageCollection("COPERNICUS/S1_GRD")
    .filterBounds(region)
    .filterDate(start, end)
    .filter(ee.Filter.eq("instrumentMode", "IW"))
    .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
    .select("VV")
    .median()
    .clip(region);
}

var before = sentinel1("2022-05-01", "2022-06-30");
var during = sentinel1("2022-08-20", "2022-09-20");
var change = during.subtract(before);
var probableFlood = during.lt(-16).and(change.lt(-3)).selfMask();

ui.App.setHeader({
  title: "FLOOD//RADAR",
  subtitle: "Sentinel-1 change detection · Sindh floods, 2022"
});
ui.App.setCss([
  ".flood-toolbar { gap: 14px; padding: 10px 14px; background: #071a2c; color: #d9f4ff; }",
  ".flood-title { color: #55d9ff; font-weight: 700; }"
].join("\n"));

var preMap = ui.Map({name: "Before flooding", lon: 68.5, lat: 26.2, zoom: 7});
var floodMap = ui.Map({name: "Flood extent", lon: 68.5, lat: 26.2, zoom: 7});
preMap.setCenter(68.5, 26.2, 7);
floodMap.setCenter(68.5, 26.2, 7);
preMap.addLayer(before, {min: -25, max: 0}, "May–June VV");
floodMap.addLayer(during, {min: -25, max: 0}, "August–September VV");
floodMap.addLayer(probableFlood, {palette: ["25d9ff"]}, "Probable flood water", true, 0.9);
ui.Map.Linker([preMap, floodMap], "change-bounds");

var comparison = ui.SplitPanel({
  firstPanel: preMap,
  secondPanel: floodMap,
  wipe: true,
  angle: -24,
  style: {stretch: "both"}
});
var toolbar = ui.Panel({
  widgets: [
    ui.Label({value: "BEFORE  ↗  DRAG THE DIVIDER  ↘  FLOOD", className: "flood-title"}),
    ui.Label("Bright cyan marks a conservative radar-change flood signal.")
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
  className: "flood-toolbar"
});
ui.root.clear();
ui.root.add(ui.Panel({widgets: [toolbar, comparison], layout: ui.Panel.Layout.flow("vertical"), style: {stretch: "both"}}));
