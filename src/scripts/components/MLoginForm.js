'use strict';

var React               = require('react/addons'),
    $                   = require('jquery'),
    MLoginConfirmMixin  = require('./MLoginConfirmMixin.js');


require('styles/MLoginForm.scss');

var MLoginForm = React.createClass({

  mixins:[MLoginConfirmMixin],

  closeLogin: function(){
    var self =this;
    var loginContainer = $(this.getDOMNode()).parent();
    $(loginContainer).css({
      'opacity':0,
    });
    setTimeout(function(){
      $(loginContainer).css({
        'z-index':'-10',
      });
      self.props.parent.update();
    },500);
  },

  doLogout: function(e){
    e.preventDefault();
    var self = this;
    this.makeLogout(function(){
      self.props.parent.update();
    });
  },

  test: function(){
    $.ajax({
      type: 'POST',
      url: 'writecontent.php',
      data: { 'test': 1, },
      success: function(msg) {   
        //var json = $.parseJSON(msg);     
        console.log(msg);
      },
      error: function(err,err2){
        console.error(err);
      }
    });
  },


  submitLogin: function(e){
    e.preventDefault();
    var self = this;
    var username = $(this.getDOMNode()).find('#inputUsername').val();
    var password = $(this.getDOMNode()).find('#inputPassword').val();
    var website = window.location.hostname;

    this.makeLogin(username,password, website, function(isLoggedIn){
      if(isLoggedIn){
        self.closeLogin();
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
          <div className="adminFunctions col-sm-12">
            <ul className="list-unstyled">
              <li><a href="#" onClick={this.doLogout}> logout </a></li>
              <li><a href="#" onClick={this.test} > refresh </a></li>
              <li><a onClick={this.regenerate} className="danger" href="#" > reset to filesystem </a></li>
            </ul>
          </div>
        </div>

        );

    }
  }
});

module.exports = MLoginForm; 

