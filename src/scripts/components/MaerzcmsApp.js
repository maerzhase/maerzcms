'use strict';

var React 				  = require('react/addons'),
		$ 				      = require('jquery'),
		MNavigation 	  = require('./MNavigation.js'),
		MProject      	= require('./MProject.js'),
    MItem           = require('./MItem.js'),
    MLoginForm      = require('./MLoginForm.js')


// CSS
require('styles/main.scss');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');

var MaerzcmsApp = React.createClass({
  
  getInitialState: function(){
    //get current url
    var url = window.location.href;
    // substring until '#'
    url = url.substring(url.indexOf("#") + 1);
    // split the url into values by '/'
    var urlValues = url.split('/'); 
    // set default values for category and item
    var item = "News";
    var category = "Home";
    // if we already have values in our url
    if(urlValues.length === 3){
      category = decodeURI(urlValues[1]);
      item = decodeURI(urlValues[2]);
    }
    // on website enter set login to '0'
    window.isLoggedIn = 0;

    return({currentItemData: null, navigationLayout:null, activeItem:item, activeCategory:category});
  },

  componentDidMount: function(){ },

  componentDidUpdate: function(){
    var loginContainer = $(this.getDOMNode()).find('#loginForm');    
    if(!$(loginContainer).hasClass("animate_opacity")){
      $(loginContainer).addClass("animate_opacity");
    }
  },

	loadNavigationLayout: function(callback){
		$.ajax({
      url:"navigationLayout.json",
      dataType: 'json',
      success: function(_data){
        callback(_data);
      },
      error:function(xhr,status,err){
        console.error(err.toString());
      }
    });
	},

  loadProjectFromServer: function(path, callback){
    $.ajax({
      url:path,
      dataType: 'json',
      success: function(_data){
        callback(_data);
      },
      error:function(xhr,status,err){
        console.error(err.toString());
      }
    });
  },

  openLoginForm: function(){
    var loginContainer = $(this.getDOMNode()).find('#loginForm');    
    $(loginContainer).css({
      'opacity':1,
      'z-index':10
    });
  },

  update: function(activeItem,activeCategory){
    // if the function gets called without updating activeItem & activeCategory
    if(typeof activeItem === 'undefined' &&  typeof activeCategory === 'undefined'){
      // set values to current state
      activeItem = this.state.activeItem;
      activeCategory = this.state.activeCategory;
      this.setState({});
    }else{
      console.log("Active Project: '" + activeItem + "' in category: '" + activeCategory + "'");
      // get reference path for activeCategory & activeItem
      var path = "content/" + activeCategory + "/" + activeItem + "/projectLayout.json";
      var self = this;
      // reload navigationLayout
      // reload projectLayout
      self.loadProjectFromServer(path, function(projectData){
        // update state
        self.setState({ currentItemData: projectData, activeItem:activeItem, activeCategory: activeCategory});
      });       
    }
    

  },

  refreshNavigation: function(){
    var self = this;

    this.loadNavigationLayout(function(navigationLayout){
      self.setState({navigationLayout: navigationLayout});
    });
  },

  componentWillMount: function(){
    var self = this;
    // get reference path for activeCategory & activeItem
    var path = "content/" + this.state.activeCategory + "/" + this.state.activeItem + "/projectLayout.json";
    // before first render 
    // initial load navigationLayout
    this.loadNavigationLayout(function(navigationLayout){
      // intial load projectLayout
      self.loadProjectFromServer(path, function(projectData){
        // update state
        self.setState({navigationLayout: navigationLayout, currentItemData: projectData});
      });
    });
  },

  render: function() {

  	var adminMode;
  	if(window.isLoggedIn == 1){
  		adminMode = "(ADMIN MODE)";
  	}
    // the main components getting initialized
    var navigation,websiteTitle, project;
  	
    if(this.state.navigationLayout !== null){
      // make navigation & websitetitle
      var data = this.state.navigationLayout;
      navigation =  <MNavigation parent={this} data={this.state.navigationLayout.navigation} activeItem={this.state.activeItem}/>; 
      websiteTitle = <MItem parent={null} all_data={null} item_data={this.state.navigationLayout.websiteTitle} url_ref={"content/"} item_ref={null}/>;

    }

    if(this.state.currentItemData !== null){
      // make project 
      project = <MProject parent={this} itemData={this.state.currentItemData} activeItem={this.state.activeItem} activeCategory={this.state.activeCategory}/>
    }
    

    return (
      <div className='main'>
          <div id="wrapper">

            <div id="sidebar-wrapper">
              <div className="sidebar-nav">
                 {websiteTitle}
  	      		   {navigation}
              </div>
            </div>

  	      	<div id="page-content-wrapper">
              <div className="page-content">
        	      <div className="row">
                  <div className='col-xs-12'>
                    {project}
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
    
  }
});

module.exports = MaerzcmsApp;
