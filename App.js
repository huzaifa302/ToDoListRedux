import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import TodoApp from './src/component/TodoApp';
import { store, persistor } from './source/redux/store';
import {View, Text, LogBox} from 'react-native';

LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
