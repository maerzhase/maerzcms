'use strict';

var React 				  = require('react/addons'),
		$ 				      = require('jquery'),
		MNavigation 	  = require('./MNavigation.js'),
		MProject      	= require('./MProject.js'),
    MItem           = require('./MItem.js'),
    MLoginForm      = require('./MLoginForm.js')


// CSS
require('../../styles/main.css');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');

var MaerzcmsApp = React.createClass({
  
  getInitialState: function(){
    var url = window.location.href;
    url = url.substring(url.indexOf("#") + 1);
    var urlValues = url.split('/'); 
    var project = "News";
    var category = "Home";

    if(urlValues.length === 3){
      category = decodeURI(urlValues[1]);
      project = decodeURI(urlValues[2]);
    }

    window.isLoggedIn = 0;
    return({data:null, activeProject:project, activeCategory:category});
  },

  componentDidMount: function(){
    this.loadDataFromServer();
  },

  componentDidUpdate: function(){
    var loginContainer = $(this.getDOMNode()).find('#loginForm');    
    if(!$(loginContainer).hasClass("animate_opacity")){
      $(loginContainer).addClass("animate_opacity");
    }
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

  openLoginForm: function(){
    var loginContainer = $(this.getDOMNode()).find('#loginForm');    
    $(loginContainer).css({
      'opacity':1,
      'z-index':'10'
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


  render: function() {
  	var adminMode;
  	if(window.isLoggedIn == 1){
  		adminMode = "(ADMIN MODE)";
  	}

  	if(this.state.data !== null){
      var data = this.state.data;

      var categoryProjects = data.projects[this.state.activeCategory];
      var currentProject = "";
      if(typeof categoryProjects !== 'undefined'){
        currentProject = categoryProjects[this.state.activeProject];
      }

      return (

	      <div className='main'>
          <div id="wrapper">

            <div id="sidebar-wrapper">
              <div className="sidebar-nav">
                <MItem parent={this} all_data={this.state.data} item_data={data.websiteTitle} item_ref="websiteTitle"/>
  	      			<MNavigation parent={this} data={this.state.data} activeProject={this.state.activeProject}/>
              </div>
            </div>

  	      	<div id="page-content-wrapper">
              <div className="page-content">
        	       	<div className="row">
                    <div className='col-xs-12'>
        	      	    <MProject parent={this} currentProject={currentProject} activeProject={this.state.activeProject} activeCategory={this.state.activeCategory} data={this.state.data}/>
        	      	  </div>
                  </div>
              </div>
            </div>

          </div>

          
          <div id="loginForm">
            <MLoginForm parent={this} />
          </div>

          <div id="footer" className="">
            <span id="adminmode">{adminMode}</span> <a onClick={this.openLoginForm} href="#"> login</a> | powered by maerzcms &copy; 2015 
          </div>

        </div>



	    );
    }else{
	    return (
	      <div className='main row'>
	      	<div className='col-xs-2'> </div>
	      	<div className='col-xs-10'> </div>
	      </div>
	    );
    }
  }
});

module.exports = MaerzcmsApp;
