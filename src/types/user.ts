export type TUserRole = "USER" | "ADMIN";

export interface IUser {
  user_name: string;
  mobile_no: string;
  role: TUserRole;
}

export interface IUserReduxSlice {
  isLoading: boolean;
  user: IUser | null;
}

export interface IUserLocalStorage {
  user: IUser;
  token: string;
}

export interface IUserRegisterRequest {
  user: {
    user_name: string;
    mobile_no: string;
    password: string;
  };
}

export interface IUserRegisterResponse {
  user: IUser;
  token: string;
}
