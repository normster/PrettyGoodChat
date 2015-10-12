var triplesec = require('triplesec');
var scrypt = require('scryptsy');
var sha512 = require('sha512');
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
        var login_session = res.body.login_session;
        var login_salt = res.body.salt;
        var data = scrypt(password, hex2bin(login_salt), 32768, 8, 1, 224);
        var hasher = sha512.hmac(data.slice(192, 224));
        hasher.update(atob(login_session));
        var salted_pass = hasher.finalize().toString('hex');
        console.log(password);
        console.log(salted_pass);
        request
          .post('https://keybase.io/_/api/1.0/login.json')
          .send({email_or_username: username, hmac_pwh: salted_pass, login_session: login_session})
          .end(function(err, res){
            console.log(res);

          });


        // var scrypt = new triplesec({N:  32768, r: 8, p: 1, c: 64});
        // scrypt.run({key: password, salt: hex2bin(login_salt), dkLen: 224}, function(salted_pass) {
        //   console.log(salted_pass.slice(192, 224));
        // });
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
