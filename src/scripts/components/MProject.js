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
		    	console.log("updated .json file");
		    },
		    error: function(err,err2){
		    	console.error(err);
		    }
		    });
  },

  getProjectContent: function(){
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
            <MItem parent={self} data={items[key]} />
  			</div>
          );
  	});

  	return itemNodes;
  },

  componentWillReceiveProps: function(){

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

