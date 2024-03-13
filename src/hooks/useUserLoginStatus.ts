import { useEffect, useState } from "react";
import { USER_ROLE } from "../constants/user";
import { TUser } from "../types/user";

const useUserLoginStatus = () => {
  const [userData, setUserData] = useState<TUser>(null);

  useEffect(() => {
    // TODO: Get the user from local storage
    const user: TUser = { role: USER_ROLE };
    setUserData(user);
  }, []);

  return userData;
};

export default useUserLoginStatus;
