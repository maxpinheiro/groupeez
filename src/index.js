import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import reportWebVitals from './reportWebVitals';

import spotifyReducer from "./reducers/SpotifyReducer";
import searchReducer from "./reducers/SearchReducer";
import detailsReducer from "./reducers/DetailsReducer";
import profileReducer from "./reducers/ProfileReducer";

import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const store = createStore(combineReducers({spotifyReducer, searchReducer, detailsReducer, profileReducer}));

ReactDOM.render(
  <React.StrictMode>
      <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
      </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
