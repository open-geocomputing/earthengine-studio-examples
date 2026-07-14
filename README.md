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
