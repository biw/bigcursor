import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './reset.css'
import { Provider } from 'react-redux'
import createStore from './store'
import { PersistGate } from 'redux-persist/integration/react';
// import * as serviceWorker from './serviceWorker';

const { store, persistor} = createStore()

ReactDOM.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
