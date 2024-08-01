import {legacy_createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tasks'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = legacy_createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
