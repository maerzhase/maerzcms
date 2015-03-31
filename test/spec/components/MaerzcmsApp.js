'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var MaerzcmsApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MaerzcmsApp = require('components/MaerzcmsApp.js');
    component = React.createElement(MaerzcmsApp);
  });

  it('should create a new instance of MaerzcmsApp', function () {
    expect(component).toBeDefined();
  });
});
