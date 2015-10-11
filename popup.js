var triplesec = require('triplesec');
var React = require('react');
var ReactDOM = require('react-dom');


var Login = React.createClass({
  render: function() {
    return  (
      <form>
      Username: <input type="text" name="username" />
      Password: <input type="password" name="password" />
      <button type="button">Login</button>
      </form>
    );
  }
});

var Encrypt = React.createClass({
  render: function() {
    return  (
      <form>
      Message: <input type="text" name="message" />
      <button type="button">Encrypt</button>
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
    if (this.state.loggedIn) {
      return <Encrypt />
    } else {
      return <Login />
    }
  }
});

var mountNode = document.getElementById('react-app');

ReactDOM.render(<App />, mountNode);
