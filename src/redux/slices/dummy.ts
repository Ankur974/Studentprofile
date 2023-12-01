import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isLodading: false,
  data: "",
};

export const authInfoslice = createSlice({
  name: "icon",
  initialState,
  reducers: {
    iconMoon: state => {
      state.isLodading = "moon";
    },
    iconSun: state => {
      state.data = "sun";
    },
  },
});

export const { iconMoon, iconSun } = authInfoslice.actions;
export default authInfoslice.reducer;
