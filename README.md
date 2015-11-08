PrettyGoodChat

We'll try to embed asymmetric key crypto into facebook chat in an entirely transparent way.
We'll code up your message (using your keybase key) when you hit enter before it gets sent off.
We'll decrypt messages from your friends in situ.

CURRENTLY SHELVED:
We had a lot of issues with finding a reliable Javascript crypto library to run the non-standard algorithm Keybase uses to authenticate logins (SCrypt). We also realized we would be introducing security vulnerabilities through our naive handling of the user's Keybase login.
