// Build a categorical legend directly from ImageCollection metadata.
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");
var landCover2018 = ee.Image(
  corine.filter(ee.Filter.eq("system:index", "2018")).first()
);

Map.setCenter(16.436, 48.2, 5);
Map.addLayer(landCover2018.select("landcover"), {}, "CORINE land cover 2018");

// ui.Legend sees that this is a collection, calls first(), and reads:
// landcover_class_values, landcover_class_names, landcover_class_palette.
var legend = ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE land cover",
  style: {
    position: "bottom-left",
    width: "390px",
    maxHeight: "65vh"
  }
});

Map.add(legend);

// Explicit legends use the same widget. Optional descriptions are displayed
// as tooltips when the user hovers a class color or name:
//
// ui.Legend({
//   values: [1, 2],
//   names: ["Forest", "Water"],
//   palette: ["00A600", "00CCF2"],
//   descriptions: ["Tree-covered land", "Permanent inland water"]
// });
