export interface LoginUser {
  email: string;
  password: string;
}
export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string; // Optional, since you didn't specify if it's required
}