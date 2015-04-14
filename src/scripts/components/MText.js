'use strict';

var React     = require('react/addons'),
    $         = require('jquery'),
    Showdown  = require('showdown');

require('styles/MText.scss');

var converter = new Showdown.converter();


var MText = React.createClass({
  
 getInitialState: function(){

    return ({parent: this.props.parent, md: this.props.md});
  },

  render: function () {

  	    var theMarkup = converter.makeHtml(this.props.md);

    return (
        <div className="MText">
            <div className="viewer" dangerouslySetInnerHTML={{__html: theMarkup}} /> 
        </div>
      );
  }
});

module.exports = MText; 

