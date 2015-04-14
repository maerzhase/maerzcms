'use strict';

describe('MLoginConfirmMixin', function () {
  var React = require('react/addons');
  var MLoginConfirmMixin, component;

  beforeEach(function () {
    MLoginConfirmMixin = require('components/MLoginConfirmMixin.js');
    component = React.createElement(MLoginConfirmMixin);
  });

  it('should create a new instance of MLoginConfirmMixin', function () {
    expect(component).toBeDefined();
  });
});
