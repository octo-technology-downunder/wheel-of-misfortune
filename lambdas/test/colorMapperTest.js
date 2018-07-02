var assert = require('assert');
const colorMapper = require('../colorMapper')

describe('getColor', function() {
  describe('_getColor()', function() {
    it('should return green when rgbc values describe a green input', function() {
      const color = colorMapper.getColor("66_118_87_264")
      assert.equal(color, 'green');
    });

    it('should return blue when rgbc values describe a blue input', function() {
      const color = colorMapper.getColor("47_76_96_210")
      assert.equal(color, 'blue');
    });

    it('should return purple when rgbc values describe a purple input', function() {
      const color = colorMapper.getColor("88_98_114_291")
      assert.equal(color, 'purple');
    });

    it('should return red when rgbc values describe a red input', function() {
      const color = colorMapper.getColor("166_69_67_284")
      assert.equal(color, 'red');
    });

    it('should return orange when rgbc values describe a orange input', function() {
      const color = colorMapper.getColor("185_103_84_356")
      assert.equal(color, 'orange');
    });

    it('should return yellow when rgbc values describe a yellow input', function() {
      const color = colorMapper.getColor("224_223_125_562")
      assert.equal(color, 'yellow');
    });
  });
});
