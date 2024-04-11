import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USER_LOALSTORAGE_KEY } from "../../constants/user";
import { getLocalStorageData } from "../../helpers/localStorage";
import { IUserLocalStorage } from "../../types/user";

interface ITokenState {
  token: string;
}

const getAuthTokenFromLocalStorage = () => {
  const token =
    getLocalStorageData<IUserLocalStorage>(USER_LOALSTORAGE_KEY)?.token;
  return token || "";
};

const initialState: ITokenState = {
  token: getAuthTokenFromLocalStorage(),
};

export const tokenStateSlice = createSlice({
  name: "tokenState",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetToken: (state) => {
      state.token = "";
    },
  },
});

export const tokenActions = tokenStateSlice.actions;
export default tokenStateSlice.reducer;
