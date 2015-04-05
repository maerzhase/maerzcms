'use strict';

describe('MLogin', function () {
  var React = require('react/addons');
  var MLogin, component;

  beforeEach(function () {
    MLogin = require('components/MLogin.js');
    component = React.createElement(MLogin);
  });

  it('should create a new instance of MLogin', function () {
    expect(component).toBeDefined();
  });
});
