export interface IRegistrationRequestBody {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}
export interface ILoginRequestBody {
  username: string;
  password: string;
}
export interface ILoginResponseBody {
  success: boolean;
  accessToken: string;
  user: IUser;
}
export interface IMeResponseBody {
  success: boolean;
  data: IMeResponseData;
}
export interface IMeResponseData {
  id: number;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  isActive: boolean;
  loginAttempts: number;
  lockUntil: string | null;
}
export interface IUser {
  id: number;
  username: string;
  email: string;
  role: "user" | "admin";
}
export interface IRefreshResponseBody {
  success: boolean;
  accessToken: string;
}
