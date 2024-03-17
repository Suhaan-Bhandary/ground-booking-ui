import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserReduxSlice, IUser } from "../../types/user";

const initialState: IUserReduxSlice = {
  isLoading: true,
  user: null,
};

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

export const userActions = userStateSlice.actions;
export default userStateSlice.reducer;
