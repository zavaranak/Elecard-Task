import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './cardSlice';
import treeSlice from './treeSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    cards: cardSlice,
    treeItems: treeSlice,
    user: userSlice,
  },
});
