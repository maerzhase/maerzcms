'use strict';

var React 				= require('react/addons'),
		$ 						= require('jquery'),
		MNavigation 	= require('./MNavigation.js'),
		MProject      = require('./MProject.js');

// CSS
require('../../styles/main.css');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');

var MaerzcmsApp = React.createClass({
  getInitialState: function(){
    return({data:null, activeProject:"", activeCategory:""});
  },
	loadDataFromServer: function(){
		$.ajax({
      url:"content.json",
      dataType: 'json',
      success: function(_data){
        this.setState({data:_data});
      }.bind(this),
      error:function(xhr,status,err){
        console.error(err.toString());
      }.bind(this)
    });
	},

	update: function(activeProject,category){
		console.log("Active Project: '" + activeProject + "' in category: '" + category + "'");
		this.setState({activeProject:activeProject, activeCategory: category});
	},

  componentDidMount: function(){
     this.loadDataFromServer();
	        
  },

  render: function() {
  	if(this.state.data !== null){
	    return (
	      <div className='main row'>
	      	<div className='col-xs-2'> 	<MNavigation parent={this} data={this.state.data}/></div>
	      	<div className='col-xs-10'>	<MProject activeProject={this.state.activeProject} activeCategory={this.state.activeCategory} data={this.state.data}/></div>
	      </div>
	    );
    }else{
	    return (
	      <div className='main'>
	      </div>
	    );
    }
  }
});

module.exports = MaerzcmsApp;
