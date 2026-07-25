# UI Apps examples

These examples progress from a single printed widget to full App composition:

1. `console-widgets.ee.js` keeps live controls in Console and never mutates
   `ui.root`.
2. `styled-app.ee.js` introduces `ui.App` headers, component classes, scoped
   CSS, form controls, and App callbacks. Use the App preview's **CSS** button to
   download the custom stylesheet.
3. `map-overlay-app.ee.js` adds a control panel to the App copy of `Map` while
   leaving Studio's permanent main Map in place.
4. `split-map-app.ee.js` composes two independent `ui.Map` widgets with
   `ui.SplitPanel`.
5. `linked-maps-app.ee.js` links two maps so panning or zooming either map keeps
   both viewports synchronized.
6. `angled-split-panel-app.ee.js` uses Studio's optional angled wipe divider,
   with live angle controls and linked maps underneath.
7. `corine-legend-app.ee.js` creates a 44-class legend by reading standard
   values, names, and palette metadata from the first image in a homogeneous
   CORINE collection.
8. `chart-dashboard.ee.js` embeds a Plotly chart and handles its click events in
   the script Worker.

All eight are JavaScript-only and can open without loading the Python runtime.
