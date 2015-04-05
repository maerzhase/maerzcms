'use strict';

var React 				= require('react/addons'),
		$ 						= require('jquery'),
		MNavigation 	= require('./MNavigation.js'),
		MProject      = require('./MProject.js'),
		MLogin      = require('./MLogin.js');

var Global = require('react-global');

// CSS
require('../../styles/main.css');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');

var MaerzcmsApp = React.createClass({
  getInitialState: function(){
    window.isLoggedIn = 0;
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
		if(typeof activeProject === 'undefined' &&  typeof category === 'undefined'){
			activeProject = this.state.activeProject;
			category = this.state.activeCategory;
		}
		console.log("Active Project: '" + activeProject + "' in category: '" + category + "'");
		this.setState({activeProject:activeProject, activeCategory: category});
	},

  componentDidMount: function(){

     this.loadDataFromServer();
  },

  render: function() {
  	var adminMode;
  	if(window.isLoggedIn == 1){
  		adminMode = "ADMIN MODE";
  	}else{

  	}

  	console.log("LOGIN STATUS -> " + window.isLoggedIn);
  	if(this.state.data !== null){

	    return (
	      <div className='main row'>
	      	<div className="col-xs-12">{ adminMode} </div>
	      	<div className='col-xs-2'> <MLogin parent={this} />  <MNavigation parent={this} data={this.state.data}/></div>
	      	<div className='col-xs-10'>
	      	 <MProject activeProject={this.state.activeProject} activeCategory={this.state.activeCategory} data={this.state.data}/>

	      	 </div>

		  </div>
	    );
    }else{
	    return (
	      <div className='main row'>
	      	<div className='col-xs-2'> NO NAVIGATION LOADED </div>
	      	<div className='col-xs-10'> NO CONTENT LOADED </div>
	      </div>
	    );
    }
  }
});

module.exports = MaerzcmsApp;
