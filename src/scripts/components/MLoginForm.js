'use strict';

var React = require('react/addons');

require('styles/MLoginForm.scss');

var MLoginForm = React.createClass({
  closeLogin: function(){
    var loginContainer = $(this.getDOMNode()).parent();
    $(loginContainer).css({
      'opacity':0,
    });
    setTimeout(function(){
      $(loginContainer).css({
        'z-index':'-10',
      });
    },500);
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
        }
        
      },

      error: function(err,err2){
        console.error(err);
      }
    });
  },

  render: function () {
    if(window.isLoggedIn === 0){

      return (
        <div>
          <div className="col-sm-9">
              <h4>Please, <span className="">Login.</span></h4><br></br>
          </div>
          <div className="col-sm-3">
            <button onClick={this.closeLogin} type="button" className="btn btn-primary btn-xs">
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Close
            </button>     
          </div>
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
                <button onTouchStart={this.submitLogin} onClick={this.submitLogin}  type="submit" className="btn btn-primary">Sign in</button>
              </div>
            </div>
          </form>
        </div>
        );
    }
    else{
      return(
        <div>
          <div className="col-sm-9">
              <h4>Welcome, <span className="">Here.</span></h4><br></br>
          </div>
          <div className="col-sm-3">
            <button onClick={this.closeLogin} type="button" className="btn btn-primary btn-xs">
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Close
            </button>     
          </div>
        </div>

        );

    }
  }
});

module.exports = MLoginForm; 

