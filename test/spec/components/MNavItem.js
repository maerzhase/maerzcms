'use strict';

describe('MNavItem', function () {
  var React = require('react/addons');
  var MNavItem, component;

  beforeEach(function () {
    MNavItem = require('components/MNavItem.js');
    component = React.createElement(MNavItem);
  });

  it('should create a new instance of MNavItem', function () {
    expect(component).toBeDefined();
  });
});
