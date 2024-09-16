import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
  },
});
