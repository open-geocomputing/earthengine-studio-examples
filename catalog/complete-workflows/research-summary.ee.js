/* global exports */

exports.summarize = function (values) {
  var clean = values.map(Number);
  var total = clean.reduce(function (sum, value) { return sum + value; }, 0);
  return {
    count: clean.length,
    mean: total / clean.length,
    minimum: Math.min.apply(null, clean),
    maximum: Math.max.apply(null, clean)
  };
};
