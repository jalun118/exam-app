import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface timerSlice {
  timer: string;
  progress: number;
}

const initialState: timerSlice = {
  timer: "00:00:00",
  progress: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    SetTimer: (state, actions: PayloadAction<timerSlice>) => {
      state.timer = actions.payload.timer;
      state.progress = actions.payload.progress;
    },
  },
});

export const { SetTimer } = timerSlice.actions;

export default timerSlice.reducer;
