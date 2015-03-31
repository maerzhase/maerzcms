'use strict';

var React = require('react/addons');

require('styles/MTextContainer.scss');

var MTextContainer = React.createClass({

    getInitialState: function(){
      return{parent:this.props.parent, mode: 'display',content:this.props.data};
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
    	this.state.parent.setActiveProject(this.state.content);
    },

	render: function(){
		if(this.state.mode === 'display'){
			return(
			<li onMouseEnter={this.mouseEnter}><a><div> {this.state.content}  </div></a></li>
			);
		}
		else if(this.state.mode === 'focus'){
			return( 
			<li onDoubleClick={this.startEdit} onMouseLeave={this.mouseLeave} onClick={this.loadProject} ><a><div> <b> {this.state.content} </b></div></a></li>
			);
		}
		else if(this.state.mode === 'edit'){
			return(
			<li><a><div onDoubleClick={this.endEdit}> <i> {this.state.content}  </i></div></a></li>
			);
		}
	}
});

module.exports = MTextContainer; 

