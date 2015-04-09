'use strict';

var React = require('react/addons'),
      $   = require('jquery'),
      MItemDummy = require('./MItemDummy.js'),
      MImage = require('./MImage.js'),
      MText      = require('./MText.js'),
      MTitle      = require('./MTitle.js');


require('styles/MItem.scss');


var MItem = React.createClass({

	getInitialState: function(){

    return({parent: this.props.parent, all_data:this.props.all_data, item_data:this.props.item_data, item_ref:this.props.item_ref});
  },
  
  componentDidMount: function(){
        var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');
          var textarea = $(editor).find('textarea');
      $(textarea).val(this.props.item_data.md);

  },

 	mouseEnter: function(){

 	},

 	mouseLeave: function(){

 	},

  autoGrow: function(e){
    var textField = e.currentTarget;
    if (textField.clientHeight < textField.scrollHeight) {
      textField.style.height = textField.scrollHeight + "px";
      if (textField.clientHeight < textField.scrollHeight) {
        textField.style.height = (textField.scrollHeight * 2 - textField.clientHeight) + "px";
      }
    }
  },

  onSubmit: function(){
    console.log("SUBMIT");
  },

  saveJson: function(md){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;

      self.props.item_data['md'] = md;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data: {'saveFile': self.props.all_data},
        success: function(msg) {
          console.log("updated .json file");
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },

  updateFile: function(md,url){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;

      self.props.item_data['md'] = md;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data:{'updateFile': 1,
              'fileURL': url,
              'fileContent': md},
        success: function(msg) {
          console.log("updated file" + msg);
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },

  isLoggedIn: function(callback){
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'checkLogin': 1, },

      success: function(msg) {
        console.log("CHECK LOGIN: " + msg);
        
        //window.isLoggedIn = msg;
        if(msg == 1){
          //self.closeLogin();
          //self.state.parent.update();
          console.log("TRUE");

          return callback(true);
        }else{
          console.log("FALSE");
          return callback(false);
        }
        
      },

      error: function(err,err2){
        console.error(err);
      }
    });
  },

  enterItem: function(){
    if(window.isLoggedIn == 0) return;
    var viewer= $(this.getDOMNode()).find('.viewer');
    $(viewer).css({
      'opacity':'0.5',
      'cursor':'pointer',
    });
  },

  leaveItem: function(){
    if(window.isLoggedIn == 0) return;
    var viewer= $(this.getDOMNode()).find('.viewer');
    $(viewer).css({
      'opacity':'1'
    });
  },

 	mouseClick: function(){
    /*
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      console.log("CEHECKER " + isLoggedIn);
      if(isLoggedIn === false) return;
      var editor = $(self.getDOMNode()).find('.editor');
      var viewer= $(self.getDOMNode()).find('.viewer');

      editor.removeClass('hidden');
      viewer.addClass('hidden');

    });
    */

    if(window.isLoggedIn == 0) return;
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer= $(this.getDOMNode()).find('.viewer');

    editor.removeClass('hidden');
    viewer.addClass('hidden');

    //this.setState({parent: this.props.parent, all_data:this.props.all_data, item_data: this.props.item_data, item_ref: this.props.item_ref});
 	},

  checkSubmit: function(e){
    if(e.keyCode === 13 && e.metaKey) {
      this.makeSubmit();
    }
  },

  makeSubmit: function(){
    var item_data = this.props.item_data;
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');

    var textarea = $(editor).find('textarea');
    
    var markdown = $(textarea).val();
    
    this.props.item_data.md = markdown;

    editor.addClass('hidden');
    viewer.removeClass('hidden');

    this.saveJson(markdown);
    
    if(item_data.type == "text" || item_data.type == "title" ){
      this.updateFile(markdown,item_data.url);
    }

    this.setState({parent: this.props.parent, all_data:this.props.all_data, item_data: this.props.item_data, item_ref: this.props.item_ref});
  },

 	inputChange: function(e){
      var md = e.currentTarget.value;
      var editor = $(this.getDOMNode()).find('.editor');
      var textarea = $(editor).find('textarea');
     // textarea = $(textarea).val('ms');
      //console.log(textarea);
      //console.log(md);
      //this.setState({md: md});
          //this.setState({parent: this.props.parent, all_data:this.props.all_data, item_data: this.props.item_data, item_ref: this.props.item_ref});

 	},

 	componentWillReceiveProps: function(){
 		
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');
          var textarea = $(editor).find('textarea');

     // $(textarea).html(this.props.item_data.md);
      $(textarea).val(this.props.item_data.md);

    editor.addClass('hidden');
    viewer.removeClass('hidden');
 	},

 	componentDidUpdate: function(){
      var editor = $(this.getDOMNode()).find('.editor');
      var textarea = $(editor).find('textarea');
   	 // console.log("TEST" + this.props.item_data.md);

      $(textarea).val(this.props.item_data.md);
  },

  getSpecificComponent: function(){
    var item_data = this.props.item_data;
    var itemComponent = {};
    var self = this;
    // make empty data if dummy item
    if(item_data === null){
      item_data = {};

    }

    // create components by item type
    switch(item_data.type){
      case "pictures":
        // if md is empty create new md
       // console.log("YES CREATING PICTURE  " + item_data.md);

        if(item_data.md === null || item_data.md == "" || typeof item_data.md === 'undefined'){
          itemComponent.md = "![picture]("+encodeURI(item_data.url)+")";
          item_data.md = itemComponent.md;

        }else{
          // use markdown from json
          itemComponent.md = item_data.md;
        }
        // make specific component
        itemComponent.component =  ( <MImage 
                                        parent={self} 
                                        url={item_data.url}
                                        md={item_data.md} 
                                        bottom="" 
                                        top="" 
                                    />);
      break;
      case "videos":
      
      break;
      case "text":
        if(item_data.md === null || item_data.md === "" || typeof item_data.md === 'undefined'){
          itemComponent.md = "";
          item_data.md = itemComponent.md;
        }else{
          // use markdown from json
          itemComponent.md = item_data.md;
        }

        itemComponent.component =  ( <MText 
                                        parent={self} 
                                        md={itemComponent.md} 
                                    />);


      break;
      case "title":
        if(item_data.md === null || item_data.md === "" || typeof item_data.md === 'undefined'){
          itemComponent.md = "";
          item_data.md = itemComponent.md;
        }else{
          // use markdown from json
          itemComponent.md = item_data.md;
        }

        itemComponent.component =  ( <MTitle 
                                        parent={self} 
                                        md={itemComponent.md} 
                                    />);


      break;
      default:
        if(item_data.md === null || item_data.md === "" || typeof item_data.md === 'undefined'){
          itemComponent.md = "";
          item_data.md = itemComponent.md;
        }else{
          // use markdown from json
          itemComponent.md = item_data.md;
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
    //console.log("a");
    //console.log("RENDERING PICTURE " + itemComponent.component.props.md);
    var editorClass ="editor hidden " + this.props.item_data.type;
		return(
			<div className="MItem">
          <div onDoubleClick={this.mouseClick} className="valid"> 
              <div onMouseOver={this.enterItem} onMouseOut={this.leaveItem} className="viewer"> {itemComponent.component} </div>
              <div className={editorClass} onSubmit={this.onSubmit}>
                <textarea rows="4" onKeyDown={this.checkSubmit} onKeyUp={this.autoGrow} onChange={this.inputChange} className="form-control">
                <div>{itemComponent.md} </div>
                </textarea>
              </div> 
          </div>
      </div>
    );
	}
});

module.exports = MItem; 

