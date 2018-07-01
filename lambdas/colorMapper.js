'use strict';

const KNOWN_COLORS_MAPPINGS = [
  {color: 'green', mapping: {r:67, g:120.875, b:89.25, c:269.125}},
  {color: 'blue', mapping: {r:45.375, g:72.875, b:91.75, c:202.25}},
  {color: 'purple', mapping: {r:86.25, g:94.75, b:109.5, c:280.75}},
  {color: 'red', mapping: {r:163, g:68, b:66.75, c:280.25}},
  {color: 'orange', mapping: {r:182.125, g:101.75, b:83, c:338.125}},
  {color: 'yellow', mapping: {r:234.25, g:233.875, b:130, c:586.25}}
];

module.exports.getColor = (rgbcMapping) => {
  const colorSimilarityArray = KNOWN_COLORS_MAPPINGS.map(colorMapping => {
    let colorSimilarity = {}
    colorSimilarity[colorMapping['color']] = getDifference(colorMapping['mapping'], rgbcMapping);
    return colorSimilarity;
  });
  let colorSimilarityMap = Object.assign(...colorSimilarityArray);
  const similarColor = Object.keys(colorSimilarityMap).reduce((colorA, colorB) => colorSimilarityMap[colorA] < colorSimilarityMap[colorB] ? colorA : colorB);
  return similarColor
};

//: getDifference(colorMapping['mapping'], rgbcMapping)}
function getDifference(knownMapping, newMapping) {
  return Math.pow(knownMapping.r - newMapping.r, 2) +
          Math.pow(knownMapping.g - newMapping.g, 2) +
          Math.pow(knownMapping.b - newMapping.b, 2) +
          Math.pow(knownMapping.c - newMapping.c, 2);
}
