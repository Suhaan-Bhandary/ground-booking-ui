import { API_BASE_URL } from "../constants/app";
import { getUserAuthToken } from "../helpers/authToken";
import { IPayment } from "../types/event";

export const fetchRegistrationPaymentDetail = async (
  registrationId: number,
) => {
  const url = new URL(
    `${API_BASE_URL}/registrations/${registrationId}/payments`,
  );

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getUserAuthToken()}` },
  });

  if (!response.ok) {
    throw Error("Something went wrong");
  }

  return response.json() as Promise<IPayment>;
};
