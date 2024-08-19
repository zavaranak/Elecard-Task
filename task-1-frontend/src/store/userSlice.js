import { createSelector, createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, selectUserDataFirebase } from '@utils/firebase';
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
  },
  reducers: {
    setUser: (state, action) => {
      state.authState = action.payload.state;
      state.email = action.payload.email;
      if (action.payload.userData) {
        Object.assign(state.data, action.payload.userData);
      }
    },
  },
});

export const { setUser } = userSlice.actions;

const fetchUserData = (user) => async (dispatch) => {
  const userData = await selectUserDataFirebase();
  userData.email = user.email;
  dispatch(setUser({ state: 'passed', userData: userData }));
};

export const listenToAuthState = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(fetchUserData(user));
    } else dispatch(setUser({ state: 'notPassed' }));
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

export default userSlice.reducer;
