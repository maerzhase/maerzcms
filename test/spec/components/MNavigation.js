'use strict';

describe('MNavigation', function () {
  var React = require('react/addons');
  var MNavigation, component;

  beforeEach(function () {
    MNavigation = require('components/MNavigation.js');
    component = React.createElement(MNavigation);
  });

  it('should create a new instance of MNavigation', function () {
    expect(component).toBeDefined();
  });
});
