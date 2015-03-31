'use strict';

describe('MProject', function () {
  var React = require('react/addons');
  var MProject, component;

  beforeEach(function () {
    MProject = require('components/MProject.js');
    component = React.createElement(MProject);
  });

  it('should create a new instance of MProject', function () {
    expect(component).toBeDefined();
  });
});
