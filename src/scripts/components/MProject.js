'use strict';

var React  = require('react/addons'),
	MItem = require('./MItem.js'),
	$ 	   = require('jquery');

require('styles/MProject.scss');

var MProject = React.createClass({

  getInitialState: function(){
     return({ activeProject: this.props.activeProject, activeCategory: this.props.activeCategory, data:this.props.data});
  },

  updateImage: function(img_ref,img_md,text_md){
  		var obj = this.state.data.projects[this.state.activeCategory];
  		var currentProject =obj[this.props.activeProject];
  		var images = currentProject.pictures;
  		images[img_ref]['text'] = text_md;

  	  	$.ajax({
		    type: 'POST',
		    url: 'php/writecontent.php',
		    data: {'saveFile': this.state.data},
		    success: function(msg) {
		    	console.log("OMG");
		    },
		    error: function(err,err2){
		    	console.error(err);
		    }
		});

	// $.ajax
 //    ({
 //        type: "GET",
 //        dataType : 'json',
 //        async: false,
 //        url: 'php/test.php',
 //        data: { data: JSON.stringify(this.state.data) },
 //        success: function () {alert("Thanks!"); },
 //        failure: function() {alert("Error!");}
 //    });
  },

  getProjectContent: function(){
  	this.state.activeProject = this.props.activeProject;
	this.state.activeCategory = this.props.activeCategory;

  	var obj = this.state.data.projects[this.state.activeCategory];
  	if(typeof obj === 'undefined'){
  		return;
  	}
  	var currentProject =obj[this.props.activeProject];
  	if(typeof currentProject === 'undefined'){
  		return;
  	}
  	
  	var items = currentProject.items;
  	var self = this;
  	var itemNodes = Object.keys(items).map(function(key, index){
  		return(
        <div>
            <MItem parent={self} data={items[key]} />
  			</div>
          );
  	});
  	return itemNodes;
  },

  getProjectContent_old: function(){
  	this.state.activeProject = this.props.activeProject;
	this.state.activeCategory = this.props.activeCategory;

  	var obj = this.state.data.projects[this.state.activeCategory];
  	if(typeof obj === 'undefined'){return;}
  	//console.log(obj);
  	var currentProject =obj[this.props.activeProject];
  	if(typeof currentProject === 'undefined'){ return;}
  	var images = currentProject.pictures;
  	var md_string = "";
  	var self = this;
  	var imageNodes = Object.keys(images).map(function(key,index){
  		  	var img_md = "![picture"+ index+"]("+encodeURI(images[key]['url'])+")";
  		  	var text_md = images[key]['text'];
  			//var html_string = converter.makeHtml(md_string);
  			return (<MImage parent={self} img_ref={key} img_md={img_md} text_md={text_md} />);
  	});

  	return imageNodes;

  },
 componentWillReceiveProps: function(){
 	//this.setState({ activeProject: this.props.activeProject, activeCategory: this.props.activeCategory, data:this.props.data});
 },

  componentDidMount: function(){

  },

render: function(){
		return(
			<div className="MProject">
				{this.getProjectContent()}
				 
			</div>

			);
	}

});




module.exports = MProject; 

