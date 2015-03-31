'use strict';

var React = require('react/addons'),
	MNavItem = require('./MNavItem.js');

require('styles/MNavigation.scss');


var MNavigation = React.createClass({
	
	getInitialState: function(){
      return{parent: this.props.parent, mode: 'display', data:this.props.data};
    },

    getProjectNames: function(){
			var _projects = this.state.data.projects;
			var allProjects = {};
			for(var category in _projects){
				allProjects[category] = [];
				for(var projectName in _projects[category]){
					allProjects[category].push(projectName);
				}
				//console.log("Key: " + key + " value " + _projects[key] );
			}
			//console.log(allProjects);
			return(allProjects);
		},

    componentDidMount: function(){
    	//this.setState({mode:'display', content:this.props.data});
    },

    setActiveProject: function(project_name,category){
    	this.state.parent.update(project_name,category);
    },

    render: function(){
    	var self = this;
  		//console.log(this.state.data);
  		var projectObj = this.getProjectNames();
    	var _categoryNodes = Object.keys(projectObj).map(function (category,index){
    	  var _projectNodes = projectObj[category].map(function(projectName){
    	  	return(
    	    	<MNavItem parent={self} name={projectName} category={category}></MNavItem>
    	  	);
    	  });
    	  return(
    	  	<li className="category">
    	  	{category}
    	  	{_projectNodes}
    	  	</li>
    	  	
    	  	);
    	});
    	return(
    		<div className="MNavigation"><ul className="nav nav-pills nav-stacked">{_categoryNodes}</ul>

    		</div>

    	);
    }
});




module.exports = MNavigation; 

