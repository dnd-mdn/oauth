# oauth

## 📖 Overview

This project handles OAuth authentication for our GitHub app.  See [example](https://dnd-mdn.github.io/oauth) page.

Once authenticated, applications on the same domain can interact with GitHub on the users behalf. It allows building of front end tools to simplify the management of our GitHub content.

## 🔧 Usage

Popup windows are opened to perform the authentication actions.

```js
window.open('https://dnd-mdn.github.io/oauth/login');
window.open('https://dnd-mdn.github.io/oauth/logout');
```

Applications can listen to `localStorage` change events to handle changes in authentication state.
