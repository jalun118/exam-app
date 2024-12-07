import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: "",
};

export const userSlice = createSlice({
  name: "user_login",
  initialState,
  reducers: {
    SetUserLogin: (state, actions: PayloadAction<string>) => {
      state.username = actions.payload;
    },
    RemoveUser: (state) => {
      state.username = "";
    },
  },
});

export const { RemoveUser, SetUserLogin } = userSlice.actions;

export default userSlice.reducer;
