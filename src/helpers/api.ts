export function getErrorFromApiResponse(error: unknown): string[] {
  if (isErrorArray(error)) {
    return error.data.errors;
  } else if (isErrorInMessage(error)) {
    return [error.data.message];
  } else if (isErrorInError(error)) {
    return [error.data.error];
  }

  return ["Something went wrong"];
}

interface ApiErrorResponse {
  status: number;
  data: { errors: string[] };
}

function isErrorArray(error: unknown): error is ApiErrorResponse {
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

interface ApiErrorMessageResponse {
  status: number;
  data: { message: string };
}

function isErrorInMessage(error: unknown): error is ApiErrorMessageResponse {
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

interface ApiDataErrorResponse {
  status: number;
  data: { error: string };
}

function isErrorInError(error: unknown): error is ApiDataErrorResponse {
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
