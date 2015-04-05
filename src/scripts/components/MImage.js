'use strict';

var React 	= require('react/addons'),
		$ 	= require('jquery'),
Showdown 	= require('showdown');

require('styles/MImage.scss');

var converter = new Showdown.converter();


var MImage = React.createClass({
	getInitialState: function(){
     return({parent: this.props.parent, url: this.props.url, md:this.props.md, top: this.props.top, bottom:this.props.bottom});
  },
  
  componentDidMount: function(){
  		//console.log("MOUNT");
  },

 	componentWillReceiveProps: function(){

 	},

 	componentDidUpdate: function(){

 	},


	render: function(){

    var theMarkup = converter.makeHtml( this.props.md );

		return(
			<div className="MImage"> 
				<div dangerouslySetInnerHTML={{__html: theMarkup}} /> 
			</div>
			);
	}

});

module.exports = MImage; 

