'use strict';

var React = require('react/addons'),
	MNavItem = require('./MNavItem.js');

require('styles/MNavigation.scss');


var MNavigation = React.createClass({
	
	getInitialState: function(){
      return{parent: this.props.parent, mode: 'display', data:this.props.data, loggedIn: 0, activeProject: this.props.activeProject};
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

    isLoggedIn: function(callback){
        $.ajax({
          type: 'POST',
          url: 'php/login/login.php',
          data: { 'checkLogin': 1, },
          success: function(msg) {
            //console.log("CHECK LOGIN: " + msg);
            
            //window.isLoggedIn = msg;
            if(msg == 1){
              //self.closeLogin();
              //self.state.parent.update();
              //console.log("TRUE");

              return callback(true);
            }else{
              //console.log("FALSE");
              return callback(false);
            }
          },
          error: function(err,err2){
            console.error(err);
          }
        });
      },

    componentWillReceiveProps: function(){

    },

    setActiveProject: function(project_name,category){
    	this.state.parent.update(project_name,category);
    },

    render: function(){
    	var self = this;
  		//console.log(this.state.data);
        var homeNodes;
  		var projectObj = this.getProjectNames();
    	var _categoryNodes = Object.keys(projectObj).map(function (category,index){
            if(category == "Home"){
                homeNodes = projectObj[category].map(function(projectName){
                    var visible = self.props.data.projects[category][projectName].visible;
                    var active;
                    if(self.props.activeProject == projectName){
                        active = "active";
                    }else{
                        active = "";
                    }
                    return( <MNavItem active={active}  visible={visible}  parent={self} name={projectName} category={category}></MNavItem> );

                });
            }
            else{
                var _projectNodes = projectObj[category].map(function(projectName){
                    var visible = self.props.data.projects[category][projectName].visible;
                    var active;
                    if(self.props.activeProject == projectName){
                        active = "active";
                    }
                    return( <MNavItem active={active} visible={visible} parent={self} name={projectName} category={category}></MNavItem> );

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
                <ul className="nav  nav-stacked">
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

