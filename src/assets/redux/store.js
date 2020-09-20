import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import reducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
