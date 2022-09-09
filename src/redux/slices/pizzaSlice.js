import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { order, sortBy, category, search, curentPage } = params;
  const { data } = await axios.get(
    `https://62e694a269bd03090f72e797.mockapi.io/items?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status : 'loading' // loading | succses | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
		state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
		state.status = 'succses'
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error'
		state.items = []
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
