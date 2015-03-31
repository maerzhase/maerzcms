'use strict';

describe('MImage', function () {
  var React = require('react/addons');
  var MImage, component;

  beforeEach(function () {
    MImage = require('components/MImage.js');
    component = React.createElement(MImage);
  });

  it('should create a new instance of MImage', function () {
    expect(component).toBeDefined();
  });
});
