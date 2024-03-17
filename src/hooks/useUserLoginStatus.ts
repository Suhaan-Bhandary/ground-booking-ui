import { useEffect } from "react";
import { userActions } from "../app/features/userSlice";
import { RootState } from "../app/store";
import { USER_LOALSTORAGE_KEY } from "../constants/user";
import { getLocalStorageData } from "../helpers/localStorage";
import { IUserLocalStorage } from "../types/user";
import { useAppDispatch, useAppSelector } from "./redux";

const useUserLoginStatus = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((store: RootState) => store.userState.user);

  useEffect(() => {
    // Load data from local storage
    const data = getLocalStorageData<IUserLocalStorage>(USER_LOALSTORAGE_KEY);

    // If user is not null or undefined then assign data.user else assign null
    dispatch(userActions.setUser(data?.user ?? null));
  }, [dispatch]);

  return userData;
};

export default useUserLoginStatus;
