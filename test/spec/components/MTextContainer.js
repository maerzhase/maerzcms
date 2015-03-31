'use strict';

describe('MTextContainer', function () {
  var React = require('react/addons');
  var MTextContainer, component;

  beforeEach(function () {
    MTextContainer = require('components/MTextContainer.js');
    component = React.createElement(MTextContainer);
  });

  it('should create a new instance of MTextContainer', function () {
    expect(component).toBeDefined();
  });
});
