'use strict';

describe('MUpdateUtils', function () {
  var React = require('react/addons');
  var MUpdateUtils, component;

  beforeEach(function () {
    MUpdateUtils = require('components/MUpdateUtils.js');
    component = React.createElement(MUpdateUtils);
  });

  it('should create a new instance of MUpdateUtils', function () {
    expect(component).toBeDefined();
  });
});
