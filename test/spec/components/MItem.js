'use strict';

describe('MItem', function () {
  var React = require('react/addons');
  var MItem, component;

  beforeEach(function () {
    MItem = require('components/MItem.js');
    component = React.createElement(MItem);
  });

  it('should create a new instance of MItem', function () {
    expect(component).toBeDefined();
  });
});
