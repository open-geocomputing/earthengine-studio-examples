/* global ee, exports */

exports.add = function (left, right) {
  return left + right;
};

exports.multiplyImage = function (image, factor) {
  return ee.Image(image).multiply(factor);
};
