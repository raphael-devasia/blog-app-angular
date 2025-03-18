export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    message: string;
    expiresIn: number;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
