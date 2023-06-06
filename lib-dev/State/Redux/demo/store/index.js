import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import rootReducer from "./rootReducer";
import apiSlice from './features/apiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([logger, apiSlice.middleware]);
  },
})

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store