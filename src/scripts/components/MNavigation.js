
'use strict';

var React               = require('react/addons'),
	  MNavItem            = require('./MNavItem.js'),
    $                   = require('jquery'),
    MLoginConfirmMixin  = require('./MLoginConfirmMixin.js');



require('styles/MNavigation.scss');
require('jquery-ui');

var MNavigation = React.createClass({

	mixins:[MLoginConfirmMixin],

	getInitialState: function(){
      return{parent: this.props.parent, mode: 'display', data:this.props.data, loggedIn: 0, activeItem: this.props.activeItem};
  },

  componentDidMount: function(){
    var self = this;
    $( "#categorySortable" ).sortable({
      forcePlaceholderSize: true,
      scroll:true,
      placeholder: "placeholder",
      beforeStop: function(e,ui){
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
      stop: function(){
        $("#categorySortable").sortable('cancel');
      },
    });
    $( "#categorySortable" ).disableSelection();

    $( ".itemSortable" ).sortable({
      forcePlaceholderSize: true,
      placeholder: "placeholder",
      beforeStop: function(e,ui){
        var new_index = ui.item.index();
        var old_index;

        var selected_name = ui.item.attr('id');

        var newArray;

        for(var i = 0; i < self.props.data.length; i++){
          var categoryObject = self.props.data[i];

          for(var j = 0; j < categoryObject['items'].length; j++){
            var name = categoryObject['items'][j]['name'];
            if(name == selected_name){
              old_index = j;
              newArray = categoryObject['items'];
              break;
            }
          }
        }

        newArray.splice(new_index, 0, newArray.splice(old_index,1)[0]);
  
        self.props.parent.update();
        self.updateNavigation(self.props.data,function(){
        });
      },
      stop: function(){
        $(".itemSortable").sortable('cancel');
      }
    });
    $( ".itemSortable" ).disableSelection();


    $( "#categorySortable" ).sortable( "option", "disabled", true );
    $( ".itemSortable" ).sortable( "option", "disabled", true );

  },

  componentWillReceiveProps: function(){
    if(window.isLoggedIn == 1){
      $( "#categorySortable" ).sortable( "option", "disabled", false );
      $( ".itemSortable" ).sortable( "option", "disabled", false );
    }else{
      $( "#categorySortable" ).sortable( "option", "disabled", true );
      $( ".itemSortable" ).sortable( "option", "disabled", true );
    }

  },


  setActiveItem: function(item_name,category){
    this.props.parent.update(item_name,category);
  },

  toggleCategoryVisibility: function(e){
    var visibilityButton  =  e.currentTarget;
    var categoryContainer =  $(visibilityButton).siblings('.categoryContainer');
    var categoryName = $(categoryContainer).text();

    if($(visibilityButton).hasClass('glyphicon-eye-open')){
      $(visibilityButton).removeClass('glyphicon-eye-open');
      $(visibilityButton).addClass('glyphicon-eye-close');

      if(!$(categoryContainer).hasClass('none')){
        $(categoryContainer).addClass('none');
        console.log(" visibility FALSE");
        for(var i = 0; i < this.props.data.length; i++){
            var name = this.props.data[i].category;
            if(name == categoryName){
              this.props.data[i].visible = "false";
              break;
            }
        }
        this.props.parent.update();

        this.updateCategoryVisibility(categoryName, "false", function(){

        });
      }
    }
    else if($(visibilityButton).hasClass('glyphicon-eye-close')){
      $(visibilityButton).removeClass('glyphicon-eye-close');
      $(visibilityButton).addClass('glyphicon-eye-open');
      console.log(" visibility TRUE");

      if($(categoryContainer).hasClass('none')){
        $(categoryContainer).removeClass('none');
              for(var i = 0; i < this.props.data.length; i++){
            var name = this.props.data[i].category;
            if(name == categoryName){
              this.props.data[i].visible = "true";
              break;
            }
        }
        this.props.parent.update();

        this.updateCategoryVisibility(categoryName, "true", function(){

        });
      }
    }
  },

  render:function(){
    var self = this;
    var navigationNodes = this.props.data.map(function(category){
        var category_span;
        var categoryContainer_class = "categoryContainer";
        var glyphiconClass = "glyphicon glyphicon-eye-open";
        if(category.visible == "false"){
          categoryContainer_class += " none";
          glyphiconClass = "glyphicon glyphicon-eye-close"
        } 

        if(window.isLoggedIn) {
          category_span = <span onClick={self.toggleCategoryVisibility} className={glyphiconClass} aria-hidden="true"></span>;
        }
        var categoryItems = category.items.map(function(item){
          var active;
          if(self.props.activeItem == item.name){
            active = "active";
          }else{
            active = "";
          }
          return( <MNavItem parent={self} active={active} visible={item.visible} name={item.name} category={category.category}/> );
        });

        return(
                  <li id={category.category} className="category">
                    <span className={categoryContainer_class}>{category.category}</span>{category_span} 
                    <ul className="itemSortable nav nav-stacked list-unstyled">{categoryItems} </ul>
                  </li>
              );
    });

    return(
        <div className="MNavigation">
          <ul id="categorySortable"  className="nav nav-stacked list-unstyled">
            {navigationNodes}
          </ul>
        </div>

          );
  }

});

module.exports = MNavigation;