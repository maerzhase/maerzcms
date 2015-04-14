'use strict';

var React               = require('react/addons'),
	  MNavItem            = require('./MNavItem.js');

require('styles/MNavigation.scss');


var MNavigation = React.createClass({

	
	getInitialState: function(){
      return{parent: this.props.parent, mode: 'display', data:this.props.data, loggedIn: 0, activeProject: this.props.activeProject};
    },

  componentDidMount: function(){ },

  componentWillReceiveProps: function(){ },

  setActiveProject: function(project_name,category){
    this.state.parent.update(project_name,category);
  },

  getProjectNames: function(){
    var _projects = this.state.data.projects;
    var allProjects = {};
    for(var category in _projects){
      allProjects[category] = [];
      for(var projectName in _projects[category]){
        allProjects[category].push(projectName);
      }
    }
    return(allProjects);
  },

  render: function(){
    var self = this;
    var homeNodes;
  	var projectObj = this.getProjectNames();
    var _categoryNodes = Object.keys(projectObj).map(function (category,index){
      var categoryProjects = self.props.data.projects[category];
      if(category == "Home"){
        homeNodes = projectObj[category].map(function(projectName){
          
          var visible = categoryProjects[projectName].visible;
          var active;
          if(self.props.activeProject == projectName){
            active = "active";
          }else{
            active = "";
          }
          var url = "content/" + category + "/" + projectName;  
          return ( <MNavItem data={categoryProjects} active={active} url={url}  visible={visible}  parent={self} name={projectName} category={category}></MNavItem> );
        });
      }else{
        var _projectNodes = projectObj[category].map(function(projectName){
          var visible = categoryProjects[projectName].visible;
          var active;
          if(self.props.activeProject == projectName){
            active = "active";
          }
          var url = "content/" + category + "/" + projectName;
          return( <MNavItem data={categoryProjects} active={active} url={url} visible={visible} parent={self} name={projectName} category={category}></MNavItem> );
        });
        return(
          <li className="category">
            {category}
            {_projectNodes}
          </li>
        );
      }
    });
    return(
    	        <div className="MNavigation">
                <ul className="nav nav-stacked">
                  <li>
                    {homeNodes}
                  </li>
                    {_categoryNodes}
                </ul>    
    		      </div>
    	    );
    }
});




module.exports = MNavigation; 

