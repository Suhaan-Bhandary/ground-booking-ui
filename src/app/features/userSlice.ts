import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../types/user";

const initialState: TUser = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
