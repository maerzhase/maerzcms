'use strict';

var $   = require('jquery');

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

  saveJson: function(data){
    var self = this;
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data: {'saveFile': data},
        success: function(msg) {
          console.log("[WRITE] updated .json file");
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


  regenerate: function(e){
    e.preventDefault();
    this.isLoggedIn(function(isLoggedIn){
      if(isLoggedIn === false) return;
      $.ajax({
        type: 'POST',
        url: 'writecontent.php',
        data: { 'regenerate': 1,},
        success: function() {
          console.log("[WRITE] regenerate");        
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },


};

module.exports = MLoginConfirmMixin; 

