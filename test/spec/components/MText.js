'use strict';

describe('MText', function () {
  var React = require('react/addons');
  var MText, component;

  beforeEach(function () {
    MText = require('components/MText.js');
    component = React.createElement(MText);
  });

  it('should create a new instance of MText', function () {
    expect(component).toBeDefined();
  });
});
