'use strict';

var React  = require('react/addons'),
	MItem = require('./MItem.js'),
	$ 	   = require('jquery'),
  Sortable = require('sortable');

require('styles/MProject.scss');

//require("http://johnny.github.io/jquery-sortable/js/jquery-sortable.js");

require('jquery-ui');

var MProject = React.createClass({

  getInitialState: function(){
     return({ activeProject: this.props.activeProject, activeCategory: this.props.activeCategory, data:this.props.data});
  },

  getProjectItems: function(){
  	this.state.activeProject = this.props.activeProject;
	  this.state.activeCategory = this.props.activeCategory;

    var categoryProjects = this.props.data.projects[this.props.activeCategory];

  	if(typeof categoryProjects === 'undefined'){
  		return;
  	}
  	var currentProject = categoryProjects[this.props.activeProject];
  	if(typeof currentProject === 'undefined'){
  		return;
  	}
  	
  	var items = currentProject.items;
    if(typeof items === 'undefined'){
      return;
    }
  	var self = this;

  	var itemNodes = Object.keys(items).map(function(key, index){
  		return(
        <div>
          <MItem parent={self} all_data={self.props.data} item_data={items[key]} item_ref={key}/>
  			</div>
          );
  	});

  	return itemNodes;
  },

  getProjectDescription: function(){
    this.state.activeProject = this.props.activeProject;
    this.state.activeCategory = this.props.activeCategory;

    var categoryProjects = this.props.data.projects[this.props.activeCategory];

    if(typeof categoryProjects === 'undefined'){
      return;
    }
    var currentProject = categoryProjects[this.props.activeProject];
    if(typeof currentProject === 'undefined'){
      return;
    }
    

    var description = <MItem parent={this} all_data={this.props.data} item_data={currentProject.description} item_ref="description" />;

    return description;
  },

  componentWillReceiveProps: function(){

  },

  componentDidMount: function(){
  },

  isVisible: function(){
    var categoryProjects = this.props.data.projects[this.props.activeCategory];

    if(typeof categoryProjects === 'undefined'){
      return;
    }
    var currentProject = categoryProjects[this.props.activeProject];
    if(typeof currentProject === 'undefined'){
      return;
    }
    var projectVisible = currentProject.visible;
    if(projectVisible === "true"){
      return true;
    }else{
      return false;
    }
  },

  updateSwitch: function(){

    var toggleBtn = $(this.getDOMNode()).find('.onoffswitch-checkbox');    
    var projectVisible = this.isVisible();

    if(projectVisible === "true"){
      $(toggleBtn).prop("checked", true);
    }else{
      $(toggleBtn).prop("checked", false);
    }

  },

  toggleSwitch: function(e){
    
    var toggleBtn = $(this.getDOMNode()).find('.onoffswitch-checkbox');    
    var val = $(toggleBtn).prop("checked");
    console.log(val);    
    if(typeof val === 'undefined' || val === true){
      $(toggleBtn).prop("checked", false);
      this.saveJson("false");
    }else{
      $(toggleBtn).prop("checked", true);
            console.log("wanna update");

      this.saveJson("true");
    }



  },

  isLoggedIn: function(callback){
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'checkLogin': 1, },

      success: function(msg) {
        console.log("CHECK LOGIN: " + msg);
        
        //window.isLoggedIn = msg;
        if(msg == 1){
          //self.closeLogin();
          //self.state.parent.update();
          console.log("TRUE");

          return callback(true);
        }else{
          console.log("FALSE");
          return callback(false);
        }
        
      },

      error: function(err,err2){
        console.error(err);
      }
    });
  },

  saveJson: function(isVisible){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;

          var categoryProjects = self.props.data.projects[self.props.activeCategory];

          if(typeof categoryProjects === 'undefined'){
            return;
          }
          var currentProject = categoryProjects[self.props.activeProject];
          if(typeof currentProject === 'undefined'){
            return;
          }
          currentProject.visible = isVisible;

      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data: {'saveFile': self.props.data},
        success: function(msg) {
          console.log("updated .json file");
          self.props.parent.update();

        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },


  render: function(){

    var visbilitySwitch = "";
    if(window.isLoggedIn == 1){
      visbilitySwitch = 
                <div onClick={this.toggleSwitch} className="onoffswitch">
                    <input  type="checkbox" name="onoffswitch" checked={this.isVisible()} className="onoffswitch-checkbox" id="myonoffswitch"/>
                    <label className="onoffswitch-label" for="myonoffswitch">
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label>
                </div>;
     
    }

		return(

			<div className="MProject">
        {visbilitySwitch}
        {this.getProjectDescription()}
        {this.getProjectItems()}
			</div>

			);
	}

});




module.exports = MProject; 

