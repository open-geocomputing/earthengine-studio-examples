# Standard Plotly Python and Earth Engine-backed ui.Plotly.
import plotly.express as px

iris = px.data.iris()
figure = px.scatter(
    iris,
    x="sepal_width",
    y="sepal_length",
    color="species",
    title="Plotly Express in Earth Engine Studio",
)
figure.show()

earth_figure = ui.Plotly({
    "name": "Earth Engine sequence",
    "data": [{
        "type": "bar",
        "x": ee.List.sequence(1, 12),
        "y": ee.List.sequence(1, 12).map(lambda value: ee.Number(value).pow(2)),
        "name": "squared",
    }],
    "layout": {"title": {"text": "Resolved by the Earth Engine backend"}},
})

def selected(event, plot):
    print("Selected Plotly payload", event)

earth_figure.on("plotly_click", selected)
earth_figure.show()
