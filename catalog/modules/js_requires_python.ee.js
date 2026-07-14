/* global print, require */
/* eslint-disable @typescript-eslint/no-require-imports */

var statistics = require("./statistics.ee.py");

print("Mean from Python:", statistics.mean([2, 4, 6, 8]));
print("Centered by Python:", statistics.center([2, 4, 6, 8]));
