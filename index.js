/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {store} from './Src/Store/MainStore';
import {name as appName} from './app.json';
import React from 'react';

const StoreApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => StoreApp);
