import { createSelector, createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  selectUserDataFirebase,
  fetchChatListFireBase,
} from '@utils/firebase';
import { initWebSocket, closeWebSocket } from '@utils/websocketService';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    authState: '',
    data: {
      email: '',
      firstName: '',
      lastName: '',
      patronym: '',
    },
    chatBoxId: [],
    chatList: [],
  },
  reducers: {
    setUserState: (state, action) => {
      state.authState = action.payload.state;
    },
    setUserData: (state, action) => {
      if (!action.payload.data) {
        state.data = {};
        state.chatBoxId = [];
        state.chatList = [];
      } else {
        Object.assign(state.data, action.payload.data.metadata);
        state.chatBoxId = action.payload.data.chatBoxId;
      }
    },
    updateUser: (state, action) => {
      Object.assign(state.data, action.payload);
    },
    updateUserChatBoxId: (state, action) => {
      state.chatBoxId = action.payload;
    },
    updateUserChatList: (state, action) => {
      state.chatList = action.payload;
    },
  },
});
export const {
  setUserData,
  setUserState,
  updateUser,
  updateUserChatBoxId,
  updateUserChatList,
} = userSlice.actions;

const fetchUserDataOnSignIn = () => async (dispatch) => {
  dispatch(setUserState({ state: 'passed' }));
  const userData = await selectUserDataFirebase();
  dispatch(setUserData({ data: userData }));
};
export const fetchChatBoxId = () => async (dispatch) => {
  const userData = await selectUserDataFirebase();
  dispatch(updateUserChatBoxId(userData.chatBoxId));
};
export const fetchChatList = (chatIdArray) => async (dispatch) => {
  const newChatList = await fetchChatListFireBase(chatIdArray);
  dispatch(updateUserChatList(newChatList));
};

export const resetUserData = () => (dispatch) => {
  dispatch(setUserData({ data: null }));
};

export const listenToAuthState = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(fetchUserDataOnSignIn());
      initWebSocket('ws://localhost:3000', user.email);
    } else {
      dispatch(setUserState({ state: 'notPassed' }));
      closeWebSocket();
    }
  });
};

const selectUser = (state) => state.user;

export const selectUserData = createSelector(
  [selectUser],
  (userState) => userState.data
);
export const selectUserAuthState = createSelector(
  [selectUser],
  (userState) => userState.authState
);
export const selectUserChatBoxId = createSelector(
  [selectUser],
  (userState) => userState.chatBoxId
);
export const selectUserChatList = createSelector(
  [selectUser],
  (userState) => userState.chatList
);

export default userSlice.reducer;
