export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

// For delete and patch operations with no data
export interface SuccessMessageResponse {
  success: true;
  message: string;
}
