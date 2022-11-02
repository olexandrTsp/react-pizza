import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

type FetchPizzasArgs = Record<string, string>;

type Pizza = {
  id: string;
  title: string;
  type: string;
  price: number;
  size: number;
  imageUrl: string;
  count: number;
};

interface pizzaSliceState {
  items: Pizza[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  curentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {order, sortBy, category, search, curentPage} = params;
    const {data} = await axios.get<Pizza[]>(
      `https://62e694a269bd03090f72e797.mockapi.io/items?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | succes | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCES;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
