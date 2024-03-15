import { createSlice } from "@reduxjs/toolkit";

const initialState={
   shopDetailsDataState:{},
   favStatusState:false,
};

export const shopDetailsSlice=createSlice({
   name:"shopDetailsData",
   initialState,
   reducers:{
      setFavStatus:(state,action)=>{
         if(action.payload){
            state.favStatusState=true;
         }
      },
      // setShopDetailsData:(state,action)=>{
         
      // },
   },
});

export const {setFavStatus,setShopDetailsData}=shopDetailsSlice.actions;

export default shopDetailsSlice.reducer;