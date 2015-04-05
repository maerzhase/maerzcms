'use strict';

describe('MTitle', function () {
  var React = require('react/addons');
  var MTitle, component;

  beforeEach(function () {
    MTitle = require('components/MTitle.js');
    component = React.createElement(MTitle);
  });

  it('should create a new instance of MTitle', function () {
    expect(component).toBeDefined();
  });
});
