import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import builderReducer from '../features/builder/builderSlice'; // ✅ fixed relative path
import responsesReducer from '../features/responses/responsesSlice'; // ✅ fixed relative path

const persistConfig = {
  key: 'root',
  storage,
};

const persistedBuilderReducer = persistReducer(persistConfig, builderReducer);
const persistedResponsesReducer = persistReducer(persistConfig, responsesReducer);

export const store = configureStore({
  reducer: {
    builder: persistedBuilderReducer,
    responses: persistedResponsesReducer,
  },
});

export const persistor = persistStore(store);
