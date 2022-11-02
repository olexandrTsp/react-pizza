import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cartpayload} from '../../Components/CartItem';
import {calcTotalPrice} from '../../utils/calcTotalPrice';
import {getCartFromLS} from '../../utils/getCartfromLS';

export type CartItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  size: number;
  imageUrl: string;
  count: number;
};

interface cartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const {totalPrice, items} = getCartFromLS();

const initialState: cartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) findItem.count++;
      else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<Cartpayload>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice -= action.payload.totalPrice;
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= action.payload.price;
      }
    },

    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions;

export default cartSlice.reducer;
