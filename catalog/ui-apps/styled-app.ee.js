// A standalone App layout with a header, reusable classes, and scoped CSS.
// Use the App preview toolbar's CSS button to download the custom stylesheet.
ui.App.setHeader({
  title: "Land-cover explorer",
  subtitle: "A JavaScript-only UI App example",
  className: "example-header"
});

ui.App.setCss([
  ".example-header { background: linear-gradient(110deg, #174ea6, #137333); }",
  ".app-card { margin: 24px; padding: 20px; background: #f8fafd; border: 1px solid #d2e3fc; border-radius: 12px; }",
  ".primary-action { color: white; background: #137333; border-color: #137333; }",
  ".status-text { color: #3c4043; font-weight: 600; }"
].join("\n"));

var status = ui.Label({
  value: "Choose a class and confidence threshold.",
  className: "status-text"
});

var landCover = ui.Select({
  items: ["Forest", "Grassland", "Water", "Urban"],
  value: "Forest"
});

var confidence = ui.Slider({
  min: 0,
  max: 100,
  value: 70,
  step: 5
});

var apply = ui.Button({
  label: "Apply settings",
  className: "primary-action",
  onClick: function () {
    status.setValue(
      landCover.getValue() + " · minimum confidence " + confidence.getValue() + "%"
    );
  }
});

var card = ui.Panel({
  widgets: [
    ui.Label("Land-cover class"),
    landCover,
    ui.Label("Minimum confidence"),
    confidence,
    apply,
    status
  ],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {width: "380px"},
  className: "app-card"
});

ui.root.clear();
ui.root.add(card);
