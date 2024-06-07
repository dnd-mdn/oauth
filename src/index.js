import React from 'react';
import ReactDOM from 'react-dom/client';

import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="https://github.com/login/oauth"
            clientId="Iv1.5dceb0507b750647"
            authorizationParams={{
                redirect_uri: "https://dnd-mdn.github.io/oauth/pop.html",
                scope: "read:user",
                allow_signup: "false"
            }}
            cacheLocation="localstorage"
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);