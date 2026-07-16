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

The **Studio basics** group contains the general map, collection, chart, and
download entrypoints. **UI Apps** contains progressively richer examples for
interactive Console widgets, styled App pages, map overlays, ordinary and
angled split maps, linked-map comparisons, and embedded charts; other focused
examples remain in the named groups that follow.

The **Map Experiments** group includes projection-aware globe examples for
dynamic compute-pixel coloring and script-defined shader expressions. The
**Animated wind field** Studio basics example demonstrates both arrow and
particle vector-field renderers on the globe. Its arrows use the uniform
equal-area distribution instead of a Mercator grid and automatically increase
their globe-wide density with zoom; toggle its layers to compare them without
rerunning the script.

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

Updates become visible to Studio after the files and manifest are public on
`master`; no editor rebuild is required.
