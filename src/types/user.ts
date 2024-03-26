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

// Types of user register
export interface IUserRegisterRequest {
  user: {
    user_name: string;
    mobile_no: string;
    password: string;
  };
}

export interface IUserRegisterRawResponse {
  user: {
    user_name: string;
    mobile_no: string;
    access_role: {
      role: string;
    };
  };
  token: string;
}

export interface IUserRegisterResponse {
  user: IUser;
  token: string;
}

// Types of user login
export interface IUserLoginRequest {
  user: {
    mobile_no: string;
    password: string;
  };
}

export interface IUserLoginRawResponse {
  user: {
    user_name: string;
    mobile_no: string;
    access_role: {
      role: string;
    };
  };
  token: string;
}

export interface IUserLoginResponse {
  user: IUser;
  token: string;
}

export interface IUserPaginatedResponse {
  users: {
    user_name: string;
    mobile_no: string;
    access_role_id: number;
  }[];
}
