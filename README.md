# oauth

## 📖 Overview

Our frontend applications are an interface to simplify managing our content. A major benefit is the ability to run them in any web browser, even on DWAN 😲. GitHub then acts as the backend to store our content, but it can do much more than that. It provides an entire ecosystem of version control and hosting tools.

## 🔐 Permissions

By signing in with GitHub, you are allowing applications to act on your behalf. They can only perform actions on projects that you are allowed to contribute to, so you may need to request access from the owner. You can later review or revoke the application [permissions](https://github.com/settings/connections/applications/6502d8679dcf3f0105f8).


## Usage


```html
<script type="module">
        import * as oauth from './oauth.js'
</script>
```

## 📑 API Reference

### `authorize()`
Initiates the authorization process and redirects the user to the authorization page.

### `codeExchange()`
Exchanges a temporary authorization code for an access token. 

### `deauthorize()`
Deauthorize the access token and revoke access for the current user.

### `user()`
Retrieve information about the authenticated user.

