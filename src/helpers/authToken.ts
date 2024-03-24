import { USER_LOALSTORAGE_KEY } from "../constants/user";
import { IUserLocalStorage } from "../types/user";
import { getLocalStorageData } from "./localStorage";

export const getUserAuthToken = () => {
  const data = getLocalStorageData<IUserLocalStorage>(USER_LOALSTORAGE_KEY);

  if (!data) return "";
  return data.token;
};
