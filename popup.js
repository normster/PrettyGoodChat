function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

document.getElementById("login-button").addEventListener("click", function() {
    document.getElementById("keybase-login").style.display = "none";
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    console.log(username);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://keybase.io/_/api/1.0/getsalt.json?email_or_username=" + username, false);
    xhr.send();

    // TODO what if there's an error
    var login_salt = json.parse(xhr.response);
    pwh = scrypt.crypto_scrypt(scrypt.encode_utf8(password),
                               scrypt.encode_utf8(hex2a(login_salt.salt)),
                               32768, 8, 1, len=224).slice(192, 224);
    console.log(pwh);
    //hmac_pwh = HMAC-SHA512(pwh, base64decode(login_session))

    document.getElementById("message-input").style.display = "block";
});
