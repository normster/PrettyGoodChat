var triplesec = require('triplesec');
var request = require('superagent');
var React = require('react');
var ReactDOM = require('react-dom');

var Login = React.createClass({
  handleLogin: function(event) {
    var username = event.target.form[0].value;
    var password = event.target.form[1].value;
    request
      .get('https://keybase.io/_/api/1.0/getsalt.json?email_or_username=' + username)
      .withCredentials()
      .end(function(err, res){
      console.log(res);
      });
  },

  render: function() {
    return  (
      <form>
      Username: <input type='text' name='username' />
      Password: <input type='password' name='password' />
      <button onClick={this.handleLogin} type='button'>Login</button>
      </form>
    );
  }
});

var Encrypt = React.createClass({
  render: function() {
    return  (
      <form>
      Message: <input type='text' name='message' />
      <button type='button'>Encrypt</button>
      </form>
    );
  }
});


var App = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false
    }
  },

  render: function() {
    //TODO add decrypt functionality later
    if (this.state.loggedIn) {
      return <Encrypt />
    } else {
      return <Login />
    }
  }
});

var mountNode = document.getElementById('react-app');

ReactDOM.render(<App />, mountNode);
