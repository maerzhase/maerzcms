'use strict';

var MaerzcmsApp = require('./MaerzcmsApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={MaerzcmsApp}>
    <Route name="/" handler={MaerzcmsApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
