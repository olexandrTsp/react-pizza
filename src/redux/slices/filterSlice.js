import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
};

export const filtesSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = filtesSlice.actions;

export default filtesSlice.reducer;
