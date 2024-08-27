import { createSelector, createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    alert: { alertStatus: 'loading', count: 0 },
  },
  reducers: {
    setAlertStatus: (state, action) => {
      state.alert.alertStatus = action.payload;
      state.alert.count++;
    },
  },
});

export const { setAlertStatus } = appSlice.actions;

const selectApp = (state) => state.app;

export const selectAlertStatus = createSelector(
  [selectApp],
  (appState) => appState.alert
);

export default appSlice.reducer;
