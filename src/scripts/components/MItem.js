'use strict';

var React = require('react/addons'),
      $   = require('jquery'),
      MImage = require('./MImage.js');


require('styles/MItem.scss');


var MItem = React.createClass({

	getInitialState: function(){
	  console.log("INIT");
    var itemType =  this.getItem();
    return({parent: this.props.parent, data: this.props.data});
  },
  
  componentDidMount: function(){
  		//console.log("MOUNT");
  },

 	mouseEnter: function(){

 	},

 	mouseLeave: function(){
		//$(this.getDOMNode(),'img').removeClass('display_none');
		//$(this.getDOMNode(),'input').addClass('display_none');
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
    
    //   if(editor.hasClass('hidden')){
    //       viewer.removeClass('hidden');
    //   }else{
    //     if(!viewer.hasClass('hidden')){
    //       viewer.addClass('hidden');
    //     }
    //   }
 	},

  checkSubmit: function(e){
    if(e.keyCode == 13 && e.metaKey) {
      this.makeSubmit();
    }
  },

  makeSubmit: function(){
    var data = this.props.data;
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');

    var textarea = $(editor).find('textarea');
    
    var value = $(textarea).val();
    
    console.log("SUBMIT");
    this.props.data.md = value;

    editor.addClass('hidden');
    viewer.removeClass('hidden');
    //this.render();
    this.setState({parent: this.props.parent, data: this.props.data});
  },

 	inputChange: function(d){
      var md = d.value;
      var editor = $(this.getDOMNode()).find('.editor');
      var textarea = $(editor).find('textarea');



      //this.setState({md: md});
 	},

 	componentWillReceiveProps: function(){
 		//this.setState({parent: this.props.parent, img_md:this.props.img_md, text_md:this.props.text_md});
 		var input = $(this.getDOMNode()).find('input');
 		input.addClass('hidden');
    console.log("WILL");

    
 	},

 	componentDidUpdate: function(){
    console.log("UPDATE");

 	},

  getItem: function(){
    var element;
    var data = this.props.data;
    //console.log(data.type);
    var itemData = {};

    switch(data.type){
      case "pictures":
        if(data.md === null || data.md == "" || typeof data.md === 'undefined'){
          console.log("HAS NONe");
          itemData.md = "![picture]("+encodeURI(data.url)+")";
          data.md = itemData.md;
        }else{
          console.log("ALREADY HAS " + data.md);
          itemData.md = data.md;
        }
                  console.log(" " + itemData.md);

        itemData.obj =  ( <MImage 
                        parent={self} 
                        img_ref={data.url}
                        img_md={itemData.md} 
                        bottom="" 
                        top="" 
                                          />);
      break;
      case "videos":
      
      break;
      case "text":

      break;
    }

    return itemData;

  },

	render: function(){
    console.log("RENDER");

    var item = this.getItem();

    console.log(item.obj);
		return(
			<div className="MItem">
          <div onClick={this.mouseClick} className="valid"> 
              <div className="viewer"> {item.obj} </div>
              <form className="editor hidden" onSubmit={this.onSubmit}>
                <textarea onKeyDown={this.checkSubmit} onChange={this.inputChange} className="form-control">
                  {item.md}
                </textarea>
              </form> 
          </div>
      </div>

			);
	}
});

module.exports = MItem; 

