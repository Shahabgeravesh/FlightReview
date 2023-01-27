import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignin: false
  },
  reducers: {
    signin: (state, action) => {
      let { payload } = action;
      let { token } = payload;
      AsyncStorage.setItem('Token', token);
      state.isSignin = true;
    },
    signout: (state) => {
      AsyncStorage.removeItem('Token');
      state.isSignin = false;
    }
  }
});

export const { signin, signout } = authSlice.actions
export default authSlice.reducer