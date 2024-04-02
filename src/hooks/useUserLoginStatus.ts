import { useEffect } from "react";
import { useGetUserQuery } from "../app/features/userApi";
import { userActions } from "../app/features/userSlice";
import { RootState } from "../app/store";
import { TUserRole } from "../types/user";
import { useAppDispatch, useAppSelector } from "./redux";

const useUserLoginStatus = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((store: RootState) => store.userState.user);

  const { data: userStatusResult, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (isLoading) return;

    // If user is not null or undefined then assign data.user else assign null
    if (userStatusResult?.user) {
      const user = userStatusResult?.user;
      dispatch(
        userActions.setUser({
          user_name: user.user_name,
          mobile_no: user.mobile_no,
          role: user.access_role.toUpperCase() as TUserRole,
        }),
      );
    } else {
      dispatch(userActions.setUser(null));
    }
  }, [dispatch, userStatusResult, isLoading]);

  return { userData, isLoading };
};

export default useUserLoginStatus;
