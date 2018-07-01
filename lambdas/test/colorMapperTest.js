var assert = require('assert');
const colorMapper = require('../colorMapper')

describe('getColor', function() {
  describe('#getColor()', function() {
    it('should return green when rgbc values describe a green input', function() {
      const color = colorMapper.getColor({r:66, g:118, b:87, c:264})
      assert.equal(color, 'green');
    });

    it('should return blue when rgbc values describe a blue input', function() {
      const color = colorMapper.getColor({r:47, g:76, b:96, c:210})
      assert.equal(color, 'blue');
    });

    it('should return purple when rgbc values describe a purple input', function() {
      const color = colorMapper.getColor({r:88, g:98, b:114, c:291})
      assert.equal(color, 'purple');
    });

    it('should return red when rgbc values describe a red input', function() {
      const color = colorMapper.getColor({r:166, g:69, b:67, c:284})
      assert.equal(color, 'red');
    });

    it('should return orange when rgbc values describe a orange input', function() {
      const color = colorMapper.getColor({r:185, g:103, b:84, c:356})
      assert.equal(color, 'orange');
    });

    it('should return yellow when rgbc values describe a yellow input', function() {
      const color = colorMapper.getColor({r:224, g:223, b:125, c:562})
      assert.equal(color, 'yellow');
    });
  });
});
