# MapLibre 6 editor examples

These examples cover Studio’s MapLibre-only APIs in focused, editable scripts:

- `relief-and-contours.ee.js` combines hillshade methods, contour thresholds,
  Hybrid imagery, and 3D Earth Engine terrain.
- `heatmap-and-pulsing-icons.ee.js` uses local GeoJSON for weighted heatmaps and
  reduced-motion-aware pulsing points.
- `animated-routes.ee.js` progressively reveals LineString and MultiLineString
  geometry and exposes its playback handle.
- `image-collection-timeline.ee.js` prepares a bounded Earth Engine image
  timeline and demonstrates frame, timestamp, speed, and callback APIs.
- `camera-and-three-map-sync.ee.js` demonstrates `flyTo`, `easeTo`, orbit
  control, and variadic `syncMaps(map1, map2, map3)`.
- `hybrid-globe-and-proxy.ee.js` combines Hybrid globe terrain with ordered
  asynchronous `Map.getMapLibre()` commands and serializable events.

Animated examples default `essential` to `false`, allowing browser
reduced-motion preferences to pause decorative movement. Change it to `true`
only when motion is necessary to understand the visualization.
