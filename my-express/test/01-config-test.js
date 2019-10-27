const { expect } = require('chai');
const config = require('../config');

describe('config.app', () => {
  it('should be defined', () => {
    expect(config.app.port).to.be.a('number');
  });
});
