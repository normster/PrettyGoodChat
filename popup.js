var triplesec = require('triplesec');
var request = require('superagent');
var React = require('react');
var ReactDOM = require('react-dom');

function hex2bin(hex){
  var bytes = [], str;

  for(var i=0; i< hex.length-1; i+=2)
    bytes.push(parseInt(hex.substr(i, 2), 16));

  return String.fromCharCode.apply(String, bytes);
}

var Login = React.createClass({
  handleLogin: function(event) {
    var username = event.target.form[0].value;
    var password = event.target.form[1].value;
    request
      .get('https://keybase.io/_/api/1.0/getsalt.json')
      .query({email_or_username: username})
      .end(function(err, res){
        var login_salt = res.body.salt;
        var scrypt = new triplesec.Scrypt({N: 32768, r: 8, p: 1, c: 64, klass: });
        scrypt.run({key: password, salt: hex2bin(login_salt), dkLen: 224}, function(salted_pass) {
          console.log(salted_pass.slice(192, 224));
        })
      });
  },

  render: function() {
    return  (
      <form>
      Username: <input type='text' name='username' />
      Password: <input type='password' name='password' />
      <button onClick={this.handleLogin} type='button'>Login</button>
      </form>
      //TODO add enter key to onClick
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
