// Printed UI widgets remain interactive in Console and do not open an App.
var result = ui.Label({
  value: "Type a name and press the button.",
  style: {color: "#9aa0a6"}
});

var nameInput = ui.Textbox({
  placeholder: "Your name",
  value: "Earth observer"
});

var greetButton = ui.Button({
  label: "Create greeting",
  onClick: function () {
    result.setValue("Hello, " + nameInput.getValue() + "!");
  }
});

var enabled = ui.Checkbox({
  label: "Enable the button",
  value: true,
  onChange: function (value) {
    greetButton.setDisabled(!value);
  }
});

print("These widgets live only in Console:", nameInput, enabled, greetButton, result);
