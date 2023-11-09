import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-a2pq8pf7p1yibmde.us.auth0.com"
    clientId="UMgZ7Fc0i4vrgT9jIskzXDDCzvkodUGw"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <GoogleOAuthProvider clientId="228975307873-ffn5klsj71qf2r0ie4b3pv67bigo8pqa.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
  </Auth0Provider>,
);
