import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  bears: 0,
  loading: false,
  list: []
};

export const fetchListAsync = createAsyncThunk(
  "fetch/list",
  async (userId, { rejectWithValue }) => {
    await sleep(1000);
    try {
      const response = await getUserInfo({id: userId})
      return response.data
    } catch (err) {
      const error = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.bears += 1;
    },

    resetValue: state => {
      state.bears = 0;
      state.list = [];
    },

    decrement: state => {
      state.bears -= 1;
    },

    incrementByAmount: (state, action) => {
      state.bears += action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchListAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.list = payload;
    })
    .addCase(fetchListAsync.rejected, (state, action) => {
      state.loading = false;
    })
  }
})

export const {
  increment,
  decrement,
  incrementByAmount,
  resetValue,
} = counterSlice.actions;
