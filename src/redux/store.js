import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';
import { modalReducer } from './modal/slice';

import { userReducer } from './user/slice.js';
import { waterReducer } from './water/slice';

import { injectStore } from './auth/operations.js';

import { waterPerReducer } from './monthInfo/waterSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // water: waterReducer,
    user: userReducer,
    water: waterReducer,
    auth: persistedAuthReducer,
    modal: modalReducer,
    waterPer: waterPerReducer,
    // filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

injectStore(store);
export const persistor = persistStore(store);
