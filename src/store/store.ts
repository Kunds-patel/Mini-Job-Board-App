import { configureStore } from '@reduxjs/toolkit';
import jobsDataReducer from '../features/jobsDataSlice';

export const store = configureStore({
  reducer: {
    jobsData: jobsDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 