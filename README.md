# Earth Engine Studio examples

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

The catalog currently contains 62 entrypoints. **Studio basics** contains the
general map, collection, chart, and download examples. **UI Apps** progresses
from Console widgets through styled pages, map overlays, ordinary and angled
split maps, linked comparisons, and embedded charts. **Map Experiments** covers
globe, terrain, compute-pixel, shader, multi-map, and vector-field rendering.

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
  a JavaScript entrypoint backed by a Python analysis module.

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
