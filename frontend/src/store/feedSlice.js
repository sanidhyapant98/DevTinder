import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = '/api';

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/user/feed?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch feed');
    }
  }
);

const initialState = {
  users: [],
  currentUserIndex: 0,
  isLoading: false,
  error: null,
  currentPage: 0,
  hasMore: true,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    nextUser: (state) => {
      if (state.currentUserIndex < state.users.length - 1) {
        state.currentUserIndex += 1;
      }
    },
    previousUser: (state) => {
      if (state.currentUserIndex > 0) {
        state.currentUserIndex -= 1;
      }
    },
    removeCurrentUser: (state) => {
      state.users.splice(state.currentUserIndex, 1);
      if (state.currentUserIndex >= state.users.length && state.currentUserIndex > 0) {
        state.currentUserIndex -= 1;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        const newUsers = action.payload;
        const limit = action.meta?.arg?.limit || 10;
        if (newUsers.length < limit) {
          state.hasMore = false;
        }
        state.users = [...state.users, ...newUsers];
        state.currentPage += 1;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { nextUser, previousUser, removeCurrentUser, clearError } = feedSlice.actions;
export default feedSlice.reducer;