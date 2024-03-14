export interface ApiErrorResponse {
  status: number;
  data: { errors: [] };
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof error.status === "number" &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data != null &&
    "errors" in error.data &&
    Array.isArray(error.data.errors)
  );
}
