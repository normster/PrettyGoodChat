document.getElementById("login-button").addEventListener("click", function() {
    document.getElementById("keybase-login").style.display = "none";
    document.getElementById("message-input").style.display = "block";
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    console.log(username);
    console.log(password);
    // var xhr = new XMLHttpRequest();
    //
    // xhr.open("GET", "https://keybase.io/_/api/1.0/getsalt.json?email_or_username=" + username, false);
    // xhr.send();
    //
    // var login_salt = xhr.response;
    // confirm(login_salt.session);
});
