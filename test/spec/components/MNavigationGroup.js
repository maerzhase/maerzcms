'use strict';

describe('MNavigationGroup', function () {
  var React = require('react/addons');
  var MNavigationGroup, component;

  beforeEach(function () {
    MNavigationGroup = require('components/MNavigationGroup.js');
    component = React.createElement(MNavigationGroup);
  });

  it('should create a new instance of MNavigationGroup', function () {
    expect(component).toBeDefined();
  });
});
