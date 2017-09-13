import React from 'react';
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';



import App from './app';
import reducers from './reducers';


//import './plain-canvas';
import './app.css';

ReactDOM.render(
  <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
    <App />
  </Provider>,
  document.getElementById('app')
);