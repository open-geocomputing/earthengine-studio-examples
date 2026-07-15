// Adding controls to Map opens it inside an App without removing Studio's Map.
ui.App.setHeader({
  title: "City map",
  subtitle: "UI controls layered over the App map"
});

ui.App.setCss([
  ".map-card { padding: 12px; background: rgba(255, 255, 255, 0.94); border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22); }",
  ".map-caption { color: #5f6368; font-size: 12px; }"
].join("\n"));

var places = {
  Innsbruck: [11.4041, 47.2692, 11],
  Vienna: [16.3738, 48.2082, 11],
  Reykjavik: [-21.9426, 64.1466, 10],
  Nairobi: [36.8219, -1.2921, 11]
};

var caption = ui.Label({
  value: "Select a city to move only the App map.",
  className: "map-caption"
});

var city = ui.Select({
  items: Object.keys(places),
  value: "Innsbruck",
  onChange: function (name) {
    var location = places[name];
    Map.setCenter(location[0], location[1], location[2]);
    caption.setValue(name + " · zoom " + location[2]);
  }
});

var controls = ui.Panel({
  widgets: [ui.Label("Jump to a city"), city, caption],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {position: "top-left", width: "270px"},
  className: "map-card"
});

Map.setCenter(11.4041, 47.2692, 11);
Map.add(controls);
