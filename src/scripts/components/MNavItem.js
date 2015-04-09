'use strict';

var React = require('react/addons');

require('styles/MNavItem.scss');

var MNavItem = React.createClass({
    getInitialState: function(){
      return{parent:this.props.parent, mode: 'display',name:this.props.name, category:this.props.category};
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
    loadProject: function(){
    	this.state.parent.setActiveProject(this.state.name, this.state.category);
    },

	render: function(){
		if(this.state.mode === 'display'){
			return(
			<li onTouchStart={this.loadProject} onMouseEnter={this.mouseEnter}><a><div> {this.state.name}  </div></a></li>
			);
		}
		else if(this.state.mode === 'focus'){
			return( 
			<li onDoubleClick={this.startEdit} onMouseLeave={this.mouseLeave} onClick={this.loadProject} ><a><div> <b> {this.state.name} </b></div></a></li>
			);
		}
		else if(this.state.mode === 'edit'){
			return(
			<li><a><div onDoubleClick={this.endEdit}> <i> {this.state.name}  </i></div></a></li>
			);
		}
	}
});

module.exports = MNavItem; 

