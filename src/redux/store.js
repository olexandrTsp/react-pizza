import { configureStore } from '@reduxjs/toolkit';
import { filtesSlice } from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filtesSlice,
  },
});
