import { configureStore } from '@reduxjs/toolkit';
import loginSliceReducer from './userSlice.js';
import { articlesApi } from '../../shared/api/index.js';

export const store = configureStore({
  reducer: {
    user: loginSliceReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});
