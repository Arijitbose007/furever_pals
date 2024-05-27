// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));

const onRedirectCallback = (appState) => {
  window.history.replaceState({}, document.title, appState?.returnTo || window.location.pathname);
  window.location.reload();
};

root.render(
  <Auth0Provider
    domain="dev-v51jbgnt6ics83yw.us.auth0.com"
    clientId="P0TfoKUwoRiegHbUFlxmGuZLsOZpp5cD"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    onRedirectCallback={onRedirectCallback}
    audience="http://localhost:3173"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
);
