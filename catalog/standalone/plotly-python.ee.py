# Runnable without Earth Engine authentication.
# Plotly.py is loaded on demand and fig.show() opens a Studio plot tab.
import plotly.graph_objects as go

land_cover = ["Forest", "Grass", "Water"]
area_km2 = [42, 31, 18]
trace = go.Bar(x=land_cover, y=area_km2)
layout = {"title": {"text": "Python Plotly example"}}
figure = go.Figure(data=[trace], layout=layout)
figure.update_xaxes(title_text="Land cover")
figure.update_yaxes(title_text="Area (km²)")
figure.show()
