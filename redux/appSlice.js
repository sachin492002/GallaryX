import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos : []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPhotos : (state,action)=>{
         state.photos = action.payload
    }
  },
});

export const { } = appSlice.actions;

export default appSlice.reducer;
