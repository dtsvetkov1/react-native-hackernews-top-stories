/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {Provider} from 'react-redux';

import MainScreen from './app/screens/MainScreen';

import store from './app/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* Put your navigation here */}
      <MainScreen />
    </Provider>
  );
};

export default App;
