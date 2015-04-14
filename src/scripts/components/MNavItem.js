'use strict';

var React = require('react/addons'),
    $   = require('jquery');

require('styles/MNavItem.scss');

var MNavItem = React.createClass({

  getInitialState: function(){
    return{data: this.props.data, active: this.props.active, visible: this.props.visible, parent:this.props.parent, mode: 'display',name:this.props.name, category:this.props.category};
  },

  mouseEnter: function(){
    this.setState({mode:'focus'});
  },

  mouseLeave: function(){
    this.setState({mode:'display'});
  },

  startEdit: function(){
    this.setState({mode:'edit'});
  },

  endEdit: function(){
    this.setState({mode:'focus'});
  },

  componentDidUpdate: function(){

  },

  loadProject: function(){
    var navItem = $(this.getDOMNode());
    this.state.parent.setActiveProject(this.state.name, this.state.category);
    var obj = { title: this.props.name, url: "/#/"+this.props.category+"/"+this.props.name };
    history.pushState(obj, obj.title, obj.url);
  },

  renameItem: function(){
    var allProjects = this.props.data;
    var oldName = this.props.name;
    var newName = "test";
    if(allProjects.hasOwnProperty(oldName)){
        allProjects[newName] = allProjects[oldName];
        delete allProjects[oldName];
        this.state.parent.setActiveProject(this.state.name, this.state.category);
        console.log(allProjects);
    }
  },

	render: function(){
    var visibleMark;
    if(this.props.visible == "false" && window.isLoggedIn == 1){
      visibleMark = "(hidden)";
    }
    var navItem;
    if(this.props.visible == "false" && window.isLoggedIn == 0){
      navItem = <li className="hidden MNavItem" onTouchStart={this.loadProject} onClick={this.loadProject} ><a className={this.props.active}><div> {this.state.name}  </div></a></li>;
    }else{
      navItem = <li className="MNavItem" onTouchStart={this.loadProject} onClick={this.loadProject}> <a className={this.props.active}><div> {this.state.name} {visibleMark}  </div></a></li>;
    }
    return ( navItem );
	}
});



module.exports = MNavItem; 

