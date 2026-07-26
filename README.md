# Earth Engine Studio examples

> [!IMPORTANT]
> **Demonstration code—not a scientific reference.** The code and scenarios in
> this repository were automatically generated to showcase and test the
> functionality of the Earth Engine Studio code editor. They have not been
> peer-reviewed or validated as scientific methods, operational products, or
> decision-making tools. Before using any example for research or real-world
> analysis, independently verify its datasets, assumptions, algorithms,
> parameters, results, and fitness for your purpose.

This repository is the public, runtime-loaded example catalog for
[Earth Engine Studio](https://github.com/open-geocomputing/earthengine-studio-editor).
Studio reads `manifest.json` from the public `master` branch and fetches an
example only when a user opens it.

## Repository layout

- `manifest.json` defines the groups and runnable entrypoints shown in Studio.
- `catalog/` contains runnable JavaScript and Python examples.
- `catalog/modules/` also contains helper modules that are intentionally absent
  from the manifest but remain addressable by relative imports.
- `scripts/validate-manifest.mjs` checks catalog metadata and referenced files
  without third-party dependencies.

The catalog currently contains 64 entrypoints. **Studio basics** contains the
general map, collection, chart, and download examples. **UI Apps** progresses
from Console widgets through styled pages, ordinary and cartographic map
overlays, ordinary and angled split maps, linked comparisons, metadata-driven
legends, and embedded charts.
**Map Experiments** covers globe, terrain, compute-pixel, shader, multi-map,
vector-field rendering, and client-side point symbols and labels.

Five story-oriented groups make the catalog useful for demonstrations as well
as learning:

- **Hazards & Response** covers radar floods, wildfire impact, volcano thermal
  detections, atmospheric pollution, and coastal change.
- **Climate & Water** covers reservoir history, Alpine snow, drought, glaciers,
  and animated ocean currents.
- **Land Change** covers forest loss, city lights, and coral habitats.
- **Analysis Labs** covers click-driven spectral plots, cloud masks, change
  indices, supervised classification, and multi-region charts.
- **Complete Workflows** connects maps and figures to export tasks and includes
  a JavaScript entrypoint backed by a local analysis module.

The hazard examples are reproducible demonstrations built from historical
public data. They are educational analyses, not operational emergency-response
products.

The **Map Experiments** group includes projection-aware globe examples for
dynamic compute-pixel coloring and script-defined shader expressions. The
**Animated wind field** Studio basics example demonstrates both arrow and
particle vector-field renderers on the globe. Its arrows use the uniform
equal-area distribution instead of a Mercator grid and automatically increase
their globe-wide density with zoom; toggle its layers to compare them without
rerunning the script.

The **Client-side point symbols** experiment passes both local GeoJSON and an
`ee.FeatureCollection` to `Map.addLayer(..., {renderer: "symbols"})`. It covers
the five label anchors, multiline text, zoom visibility, property-driven
mountain sizes and colors, fixed and zoom-scaled fonts, outline, halo, and
shadow effects on a rotated and pitched MapLibre map.

## Demonstration and screenshot conventions

Story-oriented examples use fixed dates, public assets, deterministic initial
viewports, named layers, and deliberate color palettes. UI Apps open with a
complete initial result, while export examples only register reviewable tasks;
they never submit work automatically. A good screenshot pass uses Studio's
dark theme at 1440 by 900 pixels, waits for visible map layers and charts to
resolve, and keeps the relevant layer drawer or App control visible.

Some examples intentionally exercise WebGL2, Pyodide, authenticated Earth
Engine computation, or browser folder access. Their source comments identify
the interaction or capability to inspect.

The **Cartographic Display Overlays** UI App demonstrates Studio's native
MapLibre cartography path: a complete compass rose, zoom-adaptive geographic
grid, engraved dragon/lion/serpent image layers, and text decorations that
remain outside `Map.addLayer(...)` while following globe curvature and pitched
3D terrain. Its live controls independently adjust grid-line color/width and
coordinate-label color/size.

The **Cloud Mask Shootout** intentionally selects a cloudy, snow-free tropical
scene and wipes from the raw observation to an SCL cloud-and-shadow mask. The
**Classification Studio** figure is a categorical color palette with equal
swatches; bar height does not imply class quantity or rank.

The **Reproducible Research Package** uses a local JavaScript summary module so
the multi-file workflow remains portable when it is loaded from the catalog.

## Validate changes

Run the validator before pushing changes to `master`:

```sh
node scripts/validate-manifest.mjs
```

Every displayed example needs a stable ID, title, summary, safe repository-
relative path, and `.ee.js` or `.ee.py` filename. IDs must be unique across the
entire catalog. Supporting modules should be committed beside their entrypoint
without being listed as separate examples unless they are independently
runnable.

Before committing, also parse every JavaScript entrypoint with Node and compile
the Python entrypoints and supporting modules:

```sh
find catalog -name '*.ee.js' -exec node --check {} \;
python3 -m compileall -q catalog
```

Updates become visible to Studio after the files and manifest are public on
`master`; no editor rebuild is required.
