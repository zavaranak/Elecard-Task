import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import cardSlice from './cardSlice';
import treeSlice from './treeSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    cards: cardSlice,
    treeItems: treeSlice,
    user: userSlice,
    app: appSlice,
  },
});
