'use strict';

var React               = require('react/addons'),
    $                   = require('jquery'),
    MItemDummy          = require('./MItemDummy.js'),
    MImage              = require('./MImage.js'),
    MText               = require('./MText.js'),
    MTitle              = require('./MTitle.js'),
    MLoginConfirmMixin  = require('./MLoginConfirmMixin.js');


require('styles/MItem.scss');


var MItem = React.createClass({

  mixins:[MLoginConfirmMixin],

	getInitialState: function(){
    return({parent: this.props.parent, url_ref: this.props.url_ref, all_data:this.props.all_data, item_data:this.props.item_data, item_ref:this.props.item_ref});
  },
  
  mouseEnter: function(){ },

  mouseLeave: function(){ },

  onSubmit: function(){ },

  componentDidMount: function(){
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');
    var textarea = $(editor).find('textarea');
    $(textarea).val(this.props.item_data.md);
  },

  componentWillReceiveProps: function(){
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');
    var textarea = $(editor).find('textarea');
    $(textarea).val(this.props.item_data.md);

    editor.addClass('hidden');
    viewer.removeClass('hidden');
  },

  componentDidUpdate: function(){
      var editor = $(this.getDOMNode()).find('.editor');
      var textarea = $(editor).find('textarea');
      $(textarea).val(this.props.item_data.md);
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
  
  enterItem: function(){
    if(window.isLoggedIn == 0) return;

    var viewer= $(this.getDOMNode()).find('.viewer');
    $(viewer).css({
      'opacity':'0.8',
      'cursor':'pointer',
    });
  },

  leaveItem: function(){
    if(window.isLoggedIn == 0) return;

    var viewer= $(this.getDOMNode()).find('.viewer');
    $(viewer).css({
      'opacity':'1',
      'cursor':'default',
    });
  },

 	mouseClick: function(){
    if(window.isLoggedIn == 0) return;

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
    var item_data = this.props.item_data;
    var editor = $(this.getDOMNode()).find('.editor');
    var viewer = $(this.getDOMNode()).find('.viewer');
    var textarea = $(editor).find('textarea');
    var markdown = $(textarea).val();
    
    editor.addClass('hidden');
    viewer.removeClass('hidden');
    
    this.props.item_data.md = markdown;

    var self = this;
    if(this.props.parent !== null ){
        this.updateItem(this.props.parent.props.itemData, this.props.url_ref, function(){
      });
    }

    console.log(item_data);

      if(item_data.type == "text" || item_data.type == "title" ){
        self.updateTextFile(self.props.url_ref + item_data.url, markdown);
        console.log(markdown);
      }

      self.setState({parent: self.props.parent, all_data:self.props.all_data, item_data: self.props.item_data, item_ref: self.props.item_ref});
    
  },

 	inputChange: function(e){ },

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
      case "image":
        // if md is empty create new md
       //console.log("YES CREATING PICTURE  " + item_data.md);

        if(item_data.md === null || item_data.md == "" || typeof item_data.md === 'undefined'){
          itemComponent.md = "![picture]("+encodeURI(self.props.url_ref + item_data.url)+")";
          item_data.md = itemComponent.md;

        }else{
          // use markdown from json
          itemComponent.md = item_data.md;
        }
        // make specific component
        itemComponent.component =  ( <MImage 
                                        parent={self} 
                                        url={self.props.url_ref + item_data.url}
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
    var loginClass = "MItem";
    if(window.isLoggedIn == 1){
       loginClass += " loggedIn"
    }

		return(
			<div className={loginClass}>
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

