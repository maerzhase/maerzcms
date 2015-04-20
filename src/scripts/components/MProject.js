'use strict';

var React               = require('react/addons'),
    $                   = require('jquery'),
  	MItem               = require('./MItem.js'),
    Sortable            = require('sortable'),
    MLoginConfirmMixin  = require('./MLoginConfirmMixin.js');

require('styles/MProject.scss');
require('jquery-ui');

var dragSrcEl;

var MProject = React.createClass({

  mixins:[MLoginConfirmMixin],

  getInitialState: function(){
    return({itemData: this.props.activeItem, activeItem: this.props.activeItem, activeCategory: this.props.activeCategory});
  },

  componentWillMount: function(){ },

  componentWillReceiveProps: function(){ },

  componentDidMount: function(){
    var self = this;
    $( "#sortable" ).sortable({
      forcePlaceholderSize: true,
      scroll:true,
      placeholder: "placeholder",
      beforeStop2: function(e,ui){
          var new_index = ui.item.index();
          var old_index;
          var selected_name = ui.item.attr('id');
          for(var i = 0; i < self.props.data.length; i++){
            var name = self.props.data[i].category;
            if(name == selected_name){
              old_index = i;
              break;
            }
          }

          var newArray = self.props.data;
          newArray.splice(new_index, 0, newArray.splice(old_index,1)[0]);
          
          self.props.parent.update();
          self.updateNavigation(newArray,function(){
          });
      },
      stop2: function(){
        $("#sortable").sortable('cancel');
      },
    });
    $( "#sortable" ).disableSelection();
  },

  isVisible: function(){
    var itemData = this.props.itemData;
    if(itemData === "") return;

    var projectVisible = itemData.visible;
    if(projectVisible === "true"){
      return true;
    }else{
      return false;
    }
  },

  toggleVisibilitySwitch: function(e){
    var toggleBtn = $(this.getDOMNode()).find('.onoffswitch-checkbox');    
    var val = $(toggleBtn).prop("checked");
    var path = "content/" + this.props.activeCategory + "/" + this.props.activeItem + "/";
    var self = this;
    if(typeof val === 'undefined' || val === true){
      $(toggleBtn).prop("checked", false);
      this.updateVisibility("false");

      this.updateItem(this.props.itemData,path, function(){
         //self.props.parent.update();
             self.props.parent.refreshNavigation();

      });  
    }else{
      $(toggleBtn).prop("checked", true);
      this.updateVisibility("true");
      this.updateItem(this.props.itemData,path, function(){
         //self.props.parent.update();
        self.props.parent.refreshNavigation();

      });   
    }
  },

  updateVisibility: function(isVisible){
    var itemData = this.props.itemData;
    itemData.visible = isVisible;
  },

  getProjectDescription: function(){

    var itemData = this.props.itemData;
    if(itemData === "") return;
    
    var description = <li> <MItem parent={this} all_data={this.props.data} item_data={itemData.description} item_ref="description" /> </li>;

    return description;
  },

  getProjectItems: function(){

    var itemData = this.props.itemData;
    if(itemData === "") return;

    var items = itemData.items;
    if(typeof items === 'undefined') return;
    
    var self = this;
    var itemNodes = Object.keys(items).map(function(key, index){
      return(
              <li>
                <MItem parent={self} all_data={self.props.data} item_data={items[key]} url_ref={"content/" + self.props.activeCategory + "/" + self.props.activeItem + "/"} item_ref={key}/>
              </li >
      );
    });

    return itemNodes;
  },

  getVisibilitySwitch: function(){
    var visbilitySwitch = "";
    if(window.isLoggedIn == 1){
      visbilitySwitch = 
                <div onClick={this.toggleVisibilitySwitch} className="onoffswitch">
                    <input  type="checkbox" name="onoffswitch" checked={this.isVisible()} className="onoffswitch-checkbox" id="myonoffswitch"/>
                    <label className="onoffswitch-label" for="myonoffswitch">
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label>
                </div>;
     
    }
    return visbilitySwitch;
  },

  render: function(){

    var visbilitySwitch = this.getVisibilitySwitch();

		return(
          			<div className="MProject">
                  {visbilitySwitch}
                  <ul id="sortable" className="list-unstyled">
                    {this.getProjectItems()}
          			  </ul>
                </div>
		);
	}

});




module.exports = MProject; 

