import { API_BASE_URL } from "../constants/app";
import { getUserAuthToken } from "../helpers/authToken";
import { IUserPaginatedResponse } from "../types/user";

export const fetchUsers = async ({ page = 1, username = "", mobile = "" }) => {
  const url = new URL(`${API_BASE_URL}/users`);

  url.searchParams.set("page", String(page));
  if (username) url.searchParams.set("user_name", username);
  if (mobile) url.searchParams.set("mobile_no", mobile);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getUserAuthToken()}` },
  });

  if (!response.ok) {
    if (response.status !== 400 && response.status !== 404) {
      throw Error("Something went wrong");
    }

    return { users: [] } as IUserPaginatedResponse;
  }

  return response.json() as Promise<IUserPaginatedResponse>;
};
