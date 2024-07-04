import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './cartAPI';

const initialState = {
  value: 0,  // Initial count value
  status: 'idle', // Initial status of async operation
};

// Async action to fetch count
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload; // Increment count by the payload received
      });
  },
});

export const { increment } = cartSlice.actions;

// Selector function to get the count state
export const selectCount = (state) => state.counter.value;

export default cartSlice.reducer;

