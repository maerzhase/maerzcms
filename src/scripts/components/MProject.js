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
    return({data:this.props.data, currentProject: this.props.currentProject, activeProject: this.props.activeProject, activeCategory: this.props.activeCategory});
  },

  componentWillReceiveProps: function(){ },

  componentDidMount: function(){
    var sortable = $(this.getDOMNode()).find('#sortable');
    //$(sortable).sortable();

   },

  isVisible: function(){
    var currentProject = this.props.currentProject;
    if(currentProject === "") return;

    var projectVisible = currentProject.visible;
    if(projectVisible === "true"){
      return true;
    }else{
      return false;
    }
  },

  toggleSwitch: function(e){
    var toggleBtn = $(this.getDOMNode()).find('.onoffswitch-checkbox');    
    var val = $(toggleBtn).prop("checked");

    if(typeof val === 'undefined' || val === true){
      $(toggleBtn).prop("checked", false);
      this.updateVisibility("false");
      this.saveJson(this.props.data);

    }else{
      $(toggleBtn).prop("checked", true);
      this.updateVisibility("true");
      this.saveJson(this.props.data);    }
  },

  updateVisibility: function(isVisible){
    var currentProject = this.props.currentProject;
    currentProject.visible = isVisible;
    this.props.parent.update();
  },

  dragStart: function(e){
    var dragObject = e.currentTarget;

    $(dragObject).css({
      //'position':'absolute',
      //'left':e.clientX - $(parentContainer).offset().left,
      //'top':e.pageY  - $(parentContainer).offset().top,
      //'z-index':'200',
      'opacity':'0.0'
    });
    dragSrcEl = dragObject;
   e.dataTransfer.effectAllowed = 'move';
   e.dataTransfer.setData('text/html', dragObject.innerHTML);
  },

  dragEnd: function(e){
    var dragObject = e.currentTarget;
    $(dragObject).css({
      //'left':e.clientX - $(parentContainer).offset().left,
      //'top':e.pageY  - $(parentContainer).offset().top,
      //'z-index':'200',
      'opacity':'1'
    });
  },

  isDragging: function(e){
    e.preventDefault();
    var dragObject = e.currentTarget;
    var parentContainer= $(this.getDOMNode());    

    $(dragObject).css({
      //'position':'absolute',
      //'left':e.clientX - $(parentContainer).offset().left,
      //'top':e.pageY  - $(parentContainer).offset().top,
      //'z-index':'200',
      'opacity':'0.0'
    });
  },

  dragOver: function(e){
     if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }

      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

      return false;
  },

  dragEnter: function(e){
    var enteredObject = e.currentTarget;
   $(enteredObject).css({
      //'position':'absolute',
      //'left':e.clientX - $(parentContainer).offset().left,
      //'top':e.pageY  - $(parentContainer).offset().top,
      //'z-index':'200',
      'border': '2px dashed #000',
    });
  },

  dragLeave: function(e){
    var enteredObject = e.currentTarget;
   $(enteredObject).css({
      //'position':'absolute',
      //'left':e.clientX - $(parentContainer).offset().left,
      //'top':e.pageY  - $(parentContainer).offset().top,
      //'z-index':'200',
      'border': '0px dashed #000',
    });
  },

  handleDrop: function(e){

    var dropObject = e.currentTarget;

    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = dropObject.innerHTML;
        dropObject.innerHTML = e.dataTransfer.getData('text/html');
    }
    this.props.parent.update();
    return false;
  },

  prevent: function(e){
    e.preventDefault();
  },

  getProjectDescription: function(){

    var currentProject = this.props.currentProject;
    if(currentProject === "") return;
    
    var description = <li> <MItem parent={this} all_data={this.props.data} item_data={currentProject.description} item_ref="description" /> </li>;

    return description;
  },

    getProjectDescription_draggable: function(){

    var currentProject = this.props.currentProject;
    if(currentProject === "") return;
    
    var description = <li draggable="true" onDrop={this.handleDrop} onDragEnd={this.dragEnd} onDragOver={this.dragOver} onDrag={this.isDragging} onDragEnter={this.dragEnter} onDragStart={this.dragStart} onDragLeave={this.dragLeave}> <MItem parent={this} all_data={this.props.data} item_data={currentProject.description} item_ref="description" /> </li>;

    return description;
  },

  getProjectItems: function(){

    var currentProject = this.props.currentProject;
    if(currentProject === "") return;
    
    var items = currentProject.items;
    if(typeof items === 'undefined') return;
    
    var self = this;
    var itemNodes = Object.keys(items).map(function(key, index){
      return(
              <li>
                <MItem parent={self} all_data={self.props.data} item_data={items[key]} item_ref={key}/>
              </li>
      );
    });

    return itemNodes;
  },

  getProjectItems_draggable: function(){

    var currentProject = this.props.currentProject;
    if(currentProject === "") return;
    
    var items = currentProject.items;
    if(typeof items === 'undefined') return;
    
    var self = this;
    var itemNodes = Object.keys(items).map(function(key, index){
      return(
              <li draggable="true" onDrop={self.handleDrop} onDragEnd={self.dragEnd} onDragOver={self.dragOver} onDrag={self.isDragging} onDragEnter={self.dragEnter} onDragLeave={self.dragLeave} onDragStart={self.dragStart}>
                <MItem parent={self} all_data={self.props.data} item_data={items[key]} item_ref={key}/>
              </li>
      );
    });

    return itemNodes;
  },


  getVisibilitySwitch: function(){
    var visbilitySwitch = "";
    if(window.isLoggedIn == 1){
      visbilitySwitch = 
                <div onClick={this.toggleSwitch} className="onoffswitch">
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
                    {this.getProjectDescription()}
                    {this.getProjectItems()}
          			  </ul>
                </div>
		);
	}

});




module.exports = MProject; 

