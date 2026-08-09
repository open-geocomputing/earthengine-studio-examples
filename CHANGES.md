# Changes

## Unreleased

- Added a safe-by-default Source-located errors test entry with selectable
  runtime, mapped callback, argument-type, missing-asset, mapped missing-band,
  and bounded pixel-limit failures for Console-to-editor navigation QA.

- Updated the animated wind-field example to use the canonical
  `arrowPlacement: "map"` spelling for geographically anchored uniform globe
  arrows.

- Audited every Python catalog entrypoint except OEEL. Authentication-dependent examples
  now stop with a concise sign-in instruction while signed out, the general
  Plotly example no longer unexpectedly invokes Earth Engine, the second
  interoperability step runs safely before step 1, and the remote-package
  example now uses a real public GitHub root instead of placeholder GitHub and
  GitLab coordinates. OEEL remains outside this audit.

- Added a six-script MapLibre 6 group covering DEM hillshade methods, worker
  contours, heatmaps, pulsing icons, animated LineString/MultiLineString paths,
  bounded Earth Engine image timelines and playback handles, fly/ease/orbit
  camera controls, variadic three-map synchronization, Hybrid globe terrain,
  and ordered serializable `Map.getMapLibre()` operations.

- Added a Continuous Color Bars UI App demonstrating a shared logarithmic
  `Map.addLayer` visualization, horizontal custom ticks and labels, vertical
  automatic ticks, value-side placement, titles, styles, and the mutable
  `ui.ColorBar` API.

- Added a Client-side point symbols Map Experiment demonstrating local GeoJSON
  and Earth Engine collections, circles, text-only points, antique mountain
  markers, every label anchor, multiline text, per-feature style and zoom
  overrides, scaling, outline, halo, shadow, and screen-stable orientation on
  a rotated and pitched MapLibre map. The Earth Engine portion now includes
  `WRI/GPPD/power_plants`, with fuel-driven colors, capacity-driven sizes and
  visibility thresholds, and multiline plant labels.

- Added an interactive Cartographic Display Overlays App covering
  `Map.setDisplayOptions(...)`: bearing-aware arrow/full-compass-rose/star
  indicators, adaptive border/axis graticule labels, every WebGL scale style,
  unit system, horizontal/vertical layout, configurable placement and unit
  side, pointer-aware scale calculation, globe/3D switching, and engraved
  dragon, lion, snake, and custom text decorations. It demonstrates that
  MapLibre renders geographic overlays in its WebGL scene while keeping them
  separate from `Map.addLayer`. Live controls independently configure the
  graticule line color/width and coordinate-label color/size.

- Added a CORINE UI App that passes a homogeneous
  `COPERNICUS/CORINE/V20/100m` ImageCollection to `ui.Legend`, demonstrating
  automatic 44-class value, name, and palette discovery and the explicit
  tooltip-description API.

- Added a prominent repository disclaimer explaining that the automatically
  generated examples demonstrate editor functionality and are not validated
  scientific methods, operational products, or decision-making tools.
- Reworked Cloud Mask Shootout around a deliberately cloudy, snow-free Amazon
  scene and a direct raw-versus-masked wipe that removes SCL cloud and shadow
  classes without presenting snow removal as cloud masking.
- Changed the Classification Studio Plotly figure into an equal-height
  categorical palette so Forest remains visible and class codes no longer look
  like quantities or ranks.
- Fixed the Reproducible Research Package by using a portable local JavaScript
  summary module, avoiding the runtime's non-extensible Python proxy error while
  preserving the multi-file reproducible workflow.

- Expanded the runtime catalog from 42 to 62 runnable examples across five new
  groups: Hazards & Response, Climate & Water, Land Change, Analysis Labs, and
  Complete Workflows.
- Added screenshot-oriented historical stories for radar flooding, wildfire
  impact, volcano thermal activity, atmospheric NO2, coastal movement,
  reservoir history, Alpine snow and ice, drought, ocean currents, forest loss,
  city lights, and coral habitat.
- Added focused analysis labs for click-driven spectral signatures, cloud-mask
  comparison, Landsat change indices, supervised Sentinel-2 classification,
  and multi-region vegetation histories.
- Added a satellite movie export example and a reproducible research example
  combining a JavaScript entrypoint, local module, Earth Engine map, Plotly
  figure, Console summary, and reviewable CSV task.
- Added repository ignore rules and documented catalog groups, safety scope,
  screenshot conventions, and complete syntax-validation commands.

- Updated the globe wind arrows to use the uniform equal-area distribution,
  preventing the Mercator grid from clustering arrows near the poles. The
  example now also documents its automatic zoom-adaptive density.

- Added globe examples for dynamic compute-pixel rendering and constrained
  script-defined shader expressions, and updated the animated ERA5 wind example
  to demonstrate projection-aware arrows and particles on the globe.

- Added a UI Apps group with seven runnable examples covering Console-only
  widgets, scoped App headers and CSS, map overlays, independent, linked, and
  angled split maps, and embedded chart callbacks.

- Renamed the generic Examples group to Studio basics so the catalog hierarchy
  is clearer in Earth Engine Studio.

- Added the versioned public example catalog consumed directly by Earth Engine
  Studio, including the former bundled examples, map experiments, Python and
  interoperability examples, smoke tests, plots, and module examples.
- Added a dependency-free catalog validator and documented the repository
  layout and contribution workflow.
