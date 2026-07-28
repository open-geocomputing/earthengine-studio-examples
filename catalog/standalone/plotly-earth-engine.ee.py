# Requires an authenticated Earth Engine project.
# Python ui.Plotly resolves nested Earth Engine computed values before rendering.
import ee

def selected(event, current_figure):
    print("Selected Plotly payload", event)

if not ee.data.is_initialized():
    print("Sign in and select an Earth Engine project to run this example.")
else:
    values = ee.List.sequence(1, 12)
    figure = ui.Plotly({
        "name": "Python Earth Engine values",
        "data": [{
            "type": "bar",
            "x": values,
            "y": values.map(lambda value: ee.Number(value).pow(2)),
            "name": "squared",
        }],
        "layout": {"title": {"text": "Server-resolved values"}},
    })
    figure.on("plotly_click", selected)
    figure.show()
