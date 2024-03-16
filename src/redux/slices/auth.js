import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
};

export const authInfoslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRefreshedTokens: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: state => {
      state.user = null;
    },
  },
});

export const { setUser, logout, setRefreshedTokens } = authInfoslice.actions;

export default authInfoslice.reducer;
