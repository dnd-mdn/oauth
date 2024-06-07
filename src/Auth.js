import React from 'react';

import { Auth0Provider } from '@auth0/auth0-react';

const AuthProvider = ({ children }) => {
 
    const onRedirectCallback = (appState) => {
        window.location.replace(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain="https://github.com/login/oauth"
            clientId="Iv1.5dceb0507b750647"
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
            authorizationParams={{
                scope: "read:user",
                allow_signup: "false"
            }}
        >
            {children}
        </Auth0Provider>
    );
};

export default AuthProvider;