import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';

import App from '../App';
import authReducer from '../reducers/authReducer';
import { ActionCableProvider } from "react-actioncable-provider";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(
  rootReducer,
  enhancer
);

const routing = (
  <Provider store={store}>
    <ActionCableProvider url={"wss://issyogaro.herokuapp.com/cable?token=" + localStorage.getItem('auth-token')}>
      <Router>
        <App />
      </Router>
    </ActionCableProvider>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root-container"));
