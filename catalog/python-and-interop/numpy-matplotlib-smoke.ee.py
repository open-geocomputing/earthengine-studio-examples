# NumPy, xarray, and Matplotlib browser-runtime smoke test.
import numpy as np
import xarray as xr
import matplotlib

matplotlib.use("Agg")
from matplotlib import pyplot as plt

x = np.linspace(0, 2 * np.pi, 128)
y = np.sin(x)
signal = xr.DataArray(y, coords={"angle": x}, dims=["angle"], name="sin_x")

figure, axes = plt.subplots(figsize=(5, 3))
axes.plot(x, y, label="sin(x)")
axes.set_title("Pyodide scientific stack")
axes.legend()
plt.show()

print("NumPy version", np.__version__)
print("Matplotlib version", matplotlib.__version__)
print("xarray version", xr.__version__)
print("Array mean", float(signal.mean()))
print("Opened a static Matplotlib figure in Studio")

plt.close(figure)
