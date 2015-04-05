'use strict';

var React = require('react/addons'),
      $   = require('jquery'),
      MItemDummy = require('./MItemDummy.js'),
      MImage = require('./MImage.js');


require('styles/MItem.scss');


var MItem = React.createClass({

	getInitialState: function(){

    return({parent: this.props.parent, data: this.props.data});
  },
  
  componentDidMount: function(){

  },

 	mouseEnter: function(){

 	},

 	mouseLeave: function(){

 	},

  onSubmit: function(){
    console.log("SUBMIT");
  },

 	mouseClick: function(){
    console.log("CLOCK");
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer= $(this.getDOMNode()).find('.viewer');

    editor.removeClass('hidden');
    viewer.addClass('hidden');
 	},

  checkSubmit: function(e){
    if(e.keyCode === 13 && e.metaKey) {
      this.makeSubmit();
    }
  },

  makeSubmit: function(){
    var data = this.props.data;
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');

    var textarea = $(editor).find('textarea');
    
    var value = $(textarea).val();
    
    this.props.data.md = value;

    editor.addClass('hidden');
    viewer.removeClass('hidden');

    this.setState({parent: this.props.parent, data: this.props.data});
  },

 	inputChange: function(d){
      var md = d.value;
      var editor = $(this.getDOMNode()).find('.editor');
      var textarea = $(editor).find('textarea');



      //this.setState({md: md});
 	},

 	componentWillReceiveProps: function(){
 		
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');

    editor.addClass('hidden');
    viewer.removeClass('hidden');
 	},

 	componentDidUpdate: function(){

 	},

  getSpecificComponent: function(){
    var data = this.props.data;
    var itemComponent = {};
  var self = this;
    // make empty data if dummy item
    if(data === null){
      data = {};

    }

    // create components by item type
    switch(data.type){
      case "pictures":
        // if md is empty create new md
        if(data.md === null || data.md === "" || typeof data.md === 'undefined'){
          itemComponent.md = "![picture]("+encodeURI(data.url)+")";
          data.md = itemComponent.md;
        }else{
          // use markdown from json
          itemComponent.md = data.md;
        }
        // make specific component
        itemComponent.component =  ( <MImage 
                                        parent={self} 
                                        url={data.url}
                                        md={itemComponent.md} 
                                        bottom="" 
                                        top="" 
                                    />);
      break;
      case "videos":
      
      break;
      case "text":

      break;
      default:
        if(data.md === null || data.md === "" || typeof data.md === 'undefined'){
          itemComponent.md = "";
          data.md = itemComponent.md;
        }else{
          // use markdown from json
          itemComponent.md = data.md;
        }

        itemComponent.component =  ( <MItemDummy 
                                        parent={self} 
                                        md={itemComponent.md} 
                                        bottom="" 
                                        top="" 
                                    />);


      break;
    }
    

    return itemComponent;

  },

	render: function(){

    var itemComponent = this.getSpecificComponent();

		return(
			<div className="MItem">
          <div onClick={this.mouseClick} className="valid"> 
              <div className="viewer"> {itemComponent.component} </div>
              <form className="editor hidden" onSubmit={this.onSubmit}>
                <textarea onKeyDown={this.checkSubmit} onChange={this.inputChange} className="form-control">
                  {itemComponent.md}
                </textarea>
              </form> 
          </div>
      </div>

			);
	}
});

module.exports = MItem; 

