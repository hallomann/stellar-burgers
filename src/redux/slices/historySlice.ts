import { getFeedsApi, getOrdersApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type THistoryState = {
  isLoading: boolean;
  feeds: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  history: TOrder[];
};

const initialState: THistoryState = {
  isLoading: false,
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  history: []
};

const slice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addGlobalFeed: (state, { payload }: PayloadAction<TFeedsResponse>) => {
      state.feeds = payload;
    },
    addUserFeeds: (state, { payload }: PayloadAction<TOrder[]>) => {
      state.history = payload;
    }
  },
  selectors: {
    getFeeds: (state) => state.feeds,
    getHistory: (state) => state.history,
    getFeedsOrders: (state) => state.feeds.orders,
    getFeedsTotal: (state) => state.feeds.total,
    getFeedsTotalToday: (state) => state.feeds.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchUserOrdersHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrdersHistory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserOrdersHistory.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const fetchFeeds = createAsyncThunk(
  'feed/getAll',
  async () => await getFeedsApi()
);

export const fetchUserOrdersHistory = createAsyncThunk(
  'feed/getUserHistory',
  async () => await getOrdersApi()
);

export const { addGlobalFeed, addUserFeeds } = slice.actions;
export const {
  getHistory,
  getFeedsOrders,
  getFeedsTotal,
  getFeedsTotalToday,
  getFeeds
} = slice.selectors;
export default slice.reducer;
