import { RootState, store } from "../app/store";

export const getUserAuthToken = () => {
  const state = store.getState() as RootState;
  const token = state.tokenState.token;
  return token;
};
