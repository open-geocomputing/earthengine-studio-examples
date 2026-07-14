// Local smoke test for FeatureCollection summaries.
var countries = ee.FeatureCollection("FAO/GAUL/2015/level0");

print("Countries", countries);
print("Filtered countries", countries.filter(ee.Filter.eq("ADM0_NAME", "Austria")));
print("Limited countries", countries.limit(3));
