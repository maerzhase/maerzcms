'use strict';

var React = require('react/addons');

require('styles/MNavigationGroup.scss');

var MNavigationGroup = React.createClass({

  getInitialState: function(){
    return ({data: this.props.data, name: this.props.name})
  },

  getGroup: function(){
    var groupName = this.props.name;
    var groupData = this.props.data;
    var groupItems = groupData.map(function(groupItem){
      
      // if groupItem has items its a group      
      if(groupItem.items != undefined){
        return(<MNavigationGroup data={groupItem} name={groupItem.name} /> );
      }
      
      // else its an item for the current group
      else{
        return(<MNavItem groupName={groupName} name={groupItem.name} />);
      }

    });

  },

  render: function () {
    var theGroup = this.getGroup();

    return ( 
      

      theGroup 




      );

  }
});

module.exports = MNavigationGroup; 

