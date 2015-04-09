'use strict';

var React = require('react/addons'),
    $   = require('jquery');

require('styles/MNavItem.scss');

var MNavItem = React.createClass({
    getInitialState: function(){
      return{active: this.props.active, visible: this.props.visible, parent:this.props.parent, mode: 'display',name:this.props.name, category:this.props.category};
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
        //$(navItem).addClass('active');
    	this.state.parent.setActiveProject(this.state.name, this.state.category);
        var obj = { title: this.props.name, url: "/#/"+this.props.category+"/"+this.props.name };
        history.pushState(obj, obj.title, obj.url);
    },

	render: function(){
        var visibleMark;

        if(this.props.visible == "false" && window.isLoggedIn == 1){
            visibleMark = "(hidden)";
        }

        if(this.props.visible == "false" && window.isLoggedIn == 0){
            if(this.state.mode === 'display'){
                return(
                <li className="hidden MNavItem" onTouchStart={this.loadProject} onMouseEnter={this.mouseEnter}><a className={this.props.active}><div> {this.state.name}  </div></a></li>
                );
            }
            else if(this.state.mode === 'focus'){
                return( 
                <li className="hidden MNavItem" onDoubleClick={this.startEdit} onMouseLeave={this.mouseLeave} onClick={this.loadProject} ><a className={this.props.active}><div> {this.state.name} </div></a></li>
                );
            }
            else if(this.state.mode === 'edit'){
                return(
                <li className="hidden MNavItem" ><a><div onDoubleClick={this.endEdit}> <i> {this.state.name}  </i></div></a></li>
                );
            }
        }else{
            if(this.state.mode === 'display'){
                return(
                <li className="MNavItem" onTouchStart={this.loadProject} onMouseEnter={this.mouseEnter}><a className={this.props.active}><div> {this.state.name} {visibleMark}  </div></a></li>
                );
            }
            else if(this.state.mode === 'focus'){
                return( 
                <li className="MNavItem" onDoubleClick={this.startEdit} onMouseLeave={this.mouseLeave} onClick={this.loadProject} ><a className={this.props.active}><div>{this.state.name} {visibleMark} </div></a></li>
                );
            }
            else if(this.state.mode === 'edit'){
                return(
                <li className="MNavItem"><a><div onDoubleClick={this.endEdit}> <i> {this.state.name} {visibleMark}  </i></div></a></li>
                );
            }
        }
	}
});

module.exports = MNavItem; 

