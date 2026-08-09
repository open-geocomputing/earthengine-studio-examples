// Source-located diagnostic test cases.
//
// Change TEST_TO_RUN from "none" to one key printed by listTests(). Run only
// one case at a time: every case intentionally fails. Click the resulting
// Console row and verify that Studio opens this file and highlights the
// expected line. Server-side failures may initially point to the print(...) or
// Map.addLayer(...) statement that requested evaluation; expression provenance
// should eventually move the highlight to the computation described below.
// The direct-runtime cases work signed out. Sign in before testing argumentType,
// missingAsset, mappedMissingBand, or pixelLimit.

var TEST_TO_RUN = "none";

function directRuntimeError() {
  var qc = {
    rightShift: function () {
      return {};
    },
  };

  // Expected exact highlight: the nonexistent bitwiseAnd4(...) call.
  return qc.rightShift(2).bitwiseAnd4(3);
}

function mappedCallbackRuntimeError() {
  var images = ee.ImageCollection([ee.Image(1)]);

  return images.map(function (image) {
    // Expected exact highlight: this call inside the mapped function.
    return image.notAMethod();
  });
}

function earthEngineArgumentTypeError() {
  var image = ee.Image(1);

  // Expected exact highlight: reduceRegion(...) receives an Image where an
  // ee.Reducer is required.
  return image.reduceRegion({
    reducer: ee.Image(2),
    geometry: ee.Geometry.Point([0, 0]),
    scale: 1000,
  });
}

function missingAssetError() {
  // Preferred highlight: this asset constructor.
  var missing = ee.Image(
    "projects/earthengine-studio-tests/assets/diagnostic-missing-asset"
  );

  // Acceptable fallback until object provenance is available: Map.addLayer.
  Map.addLayer(missing, {}, "Intentionally missing asset");
}

function mappedMissingBandError() {
  var images = ee.ImageCollection([
    ee.Image(1).rename("red"),
  ]);

  var selected = images.map(function (image) {
    // Preferred highlight: the invalid band selection inside the callback.
    return image.select("nir");
  });

  // Acceptable fallback: the evaluation request that exposes the server error.
  print("Mapped missing band", selected.first().bandNames());
}

function pixelLimitError() {
  // Preferred highlight: this bounded computation. maxPixels intentionally
  // forces a quick error instead of running an expensive quota stress test.
  var result = ee.Image(1).reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: ee.Geometry.Rectangle([-10, -10, 10, 10]),
    scale: 10,
    maxPixels: 1,
    bestEffort: false,
  });

  // Acceptable fallback: this evaluation request.
  print("Intentional pixel-limit error", result);
}

var tests = {
  directRuntime: directRuntimeError,
  mappedCallbackRuntime: mappedCallbackRuntimeError,
  argumentType: earthEngineArgumentTypeError,
  missingAsset: missingAssetError,
  mappedMissingBand: mappedMissingBandError,
  pixelLimit: pixelLimitError,
};

function listTests() {
  print("Set TEST_TO_RUN to one of:", Object.keys(tests));
}

if (TEST_TO_RUN === "none") {
  listTests();
} else if (tests[TEST_TO_RUN]) {
  tests[TEST_TO_RUN]();
} else {
  throw new Error("Unknown diagnostic test: " + TEST_TO_RUN);
}
