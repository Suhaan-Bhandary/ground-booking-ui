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

export interface ApiErrorMessageResponse {
  status: number;
  data: { message: string };
}

export function isApiErrorMessage(
  error: unknown,
): error is ApiErrorMessageResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof error.status === "number" &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data != null &&
    "message" in error.data &&
    typeof error.data.message === "string"
  );
}

export interface ApiDataErrorResponse {
  status: number;
  data: { error: string };
}

export function isApiDataError(error: unknown): error is ApiDataErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof error.status === "number" &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data != null &&
    "error" in error.data &&
    typeof error.data.error === "string"
  );
}
