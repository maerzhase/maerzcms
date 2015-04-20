'use strict';

var $ = require('jquery');

var MLoginConfirmMixin = {

  isLoggedIn: function(callback){
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'checkLogin': 1, },
      success: function(msg) {        
        if(msg == 1){
          return callback(true);
        }else{
          return callback(false);
        }
      },
      error: function(err,err2){
        console.error(err);
      }
    });
  },

  makeLogin: function(username, password, website, callback){
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'makeLogin': 1, 
          'username': username, 
          'password': password, 
          'website': website },
      success: function(msg) {        
        window.isLoggedIn = msg;

        if(msg == 1){
          console.log("[SERVER] login TRUE");   
          callback(true);
        }else{
          console.log("[SERVER] login FALSE");   
          callback(false);
        }
      },
      error: function(err,err2){
        console.error(err);
      }
    });
  },

  makeLogout: function(callback){
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'logout': 1,},
      success: function() {
        console.log("[SERVER] logout");   
        window.isLoggedIn = 0;
        callback();     
      },
      error: function(err,err2){
        console.error(err);
      }
    });
  },

  updateCategoryVisibility: function(category,visibility,callback){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data: { 'updateCategoryVisibility':1,
                'categoryName': category,
                'categoryVisibility':visibility
              },
        success: function(msg) {
          console.log("[WRITE] updated category visibility");
          console.log(msg);
          callback();
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },

  updateNavigation: function(data, callback){
    var self = this;
     $.ajax({
       type: 'POST',
       url: 'writecontent.php',
       data: { 'updateNavigation':1,
               'nav_data': data
             },
       success: function(msg) {
         console.log("[WRITE] updated project layout .json file");
         console.log(msg);
         callback();
       },
       error: function(err,err2){
         console.error(err);
       }
     });
  },

  updateItem: function(data,path, callback){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data: { 'updateProject':1,
                'data': data,
                'path':path
              },
        success: function(msg) {
          console.log("[WRITE] updated project layout .json file");
          console.log(msg);
          callback();
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },

  updateTextFile: function(url,content){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data:{'updateFile': 1,
              'fileURL': url,
              'fileContent': content},
        success: function(msg) {
          console.log("[WRITE] updated file " + url);
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },

  updateFolderName: function(url,folderName){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data:{'renameFolder': 1,
              'url': url,
              'folderName': folderName},
        success: function(msg) {
          console.log("[WRITE] update folder " + url);
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },


};

module.exports = MLoginConfirmMixin; 

