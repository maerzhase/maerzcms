'use strict';

describe('MItemDummy', function () {
  var React = require('react/addons');
  var MItemDummy, component;

  beforeEach(function () {
    MItemDummy = require('components/MItemDummy.js');
    component = React.createElement(MItemDummy);
  });

  it('should create a new instance of MItemDummy', function () {
    expect(component).toBeDefined();
  });
});
