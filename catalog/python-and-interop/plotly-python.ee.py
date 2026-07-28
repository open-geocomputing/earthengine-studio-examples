# Standard Plotly.py and Studio ui.Plotly, both runnable while signed out.
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

sequence = list(range(1, 13))
studio_figure = ui.Plotly({
    "name": "Python sequence",
    "data": [{
        "type": "bar",
        "x": sequence,
        "y": [value ** 2 for value in sequence],
        "name": "squared",
    }],
    "layout": {"title": {"text": "Studio ui.Plotly from Python"}},
})

def selected(event, plot):
    print("Selected Plotly payload", event)

studio_figure.on("plotly_click", selected)
studio_figure.show()
