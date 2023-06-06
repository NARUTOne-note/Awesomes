import { combineReducers } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice'
import apiSlice from './features/apiSlice'

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;