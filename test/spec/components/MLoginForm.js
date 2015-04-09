'use strict';

describe('MLoginForm', function () {
  var React = require('react/addons');
  var MLoginForm, component;

  beforeEach(function () {
    MLoginForm = require('components/MLoginForm.js');
    component = React.createElement(MLoginForm);
  });

  it('should create a new instance of MLoginForm', function () {
    expect(component).toBeDefined();
  });
});
