import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";

const initialState: IUser = {
  count: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
