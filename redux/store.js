import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './appSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },

});
