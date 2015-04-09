'use strict';

var React = require('react/addons'),
      $   = require('jquery');

require('styles/MLogin.scss');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
var Global = require('react-global');

var MLogin = React.createClass({

  getInitialState: function(){
    
    return({parent:this.props.parent});
  },

  isLoggedIn: function(callback){
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'checkLogin': 1, },
      success: function(msg) {
        //console.log("CHECK LOGIN: " + msg);
        
        //window.isLoggedIn = msg;
        if(msg == 1){
          //self.closeLogin();
          //self.state.parent.update();
          //console.log("TRUE");

          return callback(true);
        }else{
          //console.log("FALSE");
          return callback(false);
        }
      },
      error: function(err,err2){
        console.error(err);
      }
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
          console.log("regenerate");        
        },
        error: function(err,err2){
          console.error(err);
        }
      });
    });
  },

  doLogout: function(e){
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'logout': 1,},
      success: function() {
        console.log("logout");        
      },
      error: function(err,err2){
        console.error(err);
      }
    });
    window.isLoggedIn = 0;
    this.state.parent.update();
  },

  openLogin: function(){
    var loginContainer = $(this.getDOMNode()).find('.loginForm');    
    $(loginContainer).css({
      'opacity':1,
    });

  },

  closeLogin: function(){
    var loginContainer = $(this.getDOMNode()).find('.loginForm');    
    $(loginContainer).css({
      'opacity':0,
    });
  },

  submitLogin: function(e){
    e.preventDefault();
    var self = this;

    var username = $(this.getDOMNode()).find('#inputUsername').val();
    var password = $(this.getDOMNode()).find('#inputPassword').val();

    var website = window.location.hostname;


    console.log("trying php post/get with user: '" + username + "' password: '###' - on website '" + website + "'");
    
    $.ajax({
      type: 'POST',
      url: 'php/login/login.php',
      data: { 'makeLogin': 1, 
          'username': username, 
          'password': password, 
          'website': website },

      success: function(msg) {
        console.log("LOGIN IS: " + msg);
        
        window.isLoggedIn = msg;
        if(msg == 1){
          self.closeLogin();
          self.state.parent.update();
        }
        
      },

      error: function(err,err2){
        console.error(err);
      }
    });
    
  },



  render: function () {
    var loginBtn;
    if(window.isLoggedIn == 1){

      loginBtn = (<ul className="nav nav-pills nav-stacked">

                    <li><a href="#" onClick={this.doLogout}> logout </a></li>
                    <li><a href="#" > refresh </a></li>
                    <li><a onClick={this.regenerate} className="danger" href="#" > reset to filesystem </a></li>
                  </ul>
                          );
    }else{
      loginBtn = (<a href="#" onClick={this.openLogin}> login </a>);
    }

    return (
        <div className="MLogin">
          <div className="loginLink">
              {loginBtn}
          </div>

          <div className="loginForm">
            
              <div className="col-sm-9">
                  <h4>Please, <span className="">Login.</span></h4><br></br>
              </div>
              <div className="col-sm-3">
                <button onClick={this.closeLogin} type="button" className="btn btn-primary btn-xs">
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Close
                </button>     
              </div>


            <div className="logincontainer">  
            <form className="form-horizontal" onSubmit={this.submitLogin}>
              <div className="form-group">
                <label htmlFor="inputUsername" className="col-sm-4 control-label">Username</label>
                <div className="col-sm-8">
                  <input type="username" className="form-control" id="inputUsername" placeholder="Username" ></input>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="inputPassword" className="col-sm-4 control-label">Password</label>
                <div className="col-sm-8">
                  <input type="password" onSubmit={this.submitLogin} className="form-control" id="inputPassword" placeholder="Password"> </input>
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-4 col-sm-8">
                  <button onClick={this.submitLogin}  type="submit" className="btn btn-primary">Sign in</button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = MLogin; 

