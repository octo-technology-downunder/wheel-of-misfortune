'use strict';

const KNOWN_COLORS_MAPPINGS = [
  {color: 'green', mapping: {r:60, g:109, b:80, c:243}},
  {color: 'blue', mapping: {r:41, g:65, b:82, c:182}},
  {color: 'purple', mapping: {r:73, g:81, b:93, c:240}},
  {color: 'red', mapping: {r:154, g:65, b:63, c:268}},
  {color: 'orange', mapping: {r:173, g:98, b:79, c:337}},
  {color: 'yellow', mapping: {r:198, g:199, b:111, c:501}}
];

module.exports.getColor = (rgbcMapping) => {
  const rgbcArray = rgbcMapping.split('_');
  const jsonRgbcMapping = {r: parseInt(rgbcArray[0]), 
    g: parseInt(rgbcArray[1]), 
    b: parseInt(rgbcArray[2]), 
    c: parseInt(rgbcArray[3])}
  console.log(jsonRgbcMapping);

  const colorSimilarityArray = KNOWN_COLORS_MAPPINGS.map(colorMapping => {
    let colorSimilarity = {}
    colorSimilarity[colorMapping['color']] = getDifference(colorMapping['mapping'], jsonRgbcMapping);
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
