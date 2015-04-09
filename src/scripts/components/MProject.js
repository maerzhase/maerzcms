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

  render: function(){

		return(
			<div className="MProject">
        {this.getProjectDescription()}
        {this.getProjectItems()}
			</div>

			);
	}

});




module.exports = MProject; 

