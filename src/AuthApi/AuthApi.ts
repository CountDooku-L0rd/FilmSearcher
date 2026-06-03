import type { NavigateFunction } from "react-router";
import type { AppDispatch } from "../store/store";
import { showErrorToast, showSuccessToast } from "../toasts/toasts";
import {
  clearCredentials,
  setAuthenticated,
  setCredentials,
} from "../store/authSlice";
import type {
  ILoginRequestBody,
  ILoginResponseBody,
  IMeResponseBody,
  IRefreshResponseBody,
  IRegistrationRequestBody,
} from "./types/AuthApiTypes";
import { createUserFromData } from "../utils/utils";

class AuthApi {
  logout = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Ошибка ${response.status}`);
    }
    return response.json();
  };
  logoutOnSuccess = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    showSuccessToast("Успешный разлогин");
    localStorage.removeItem("accessToken");
    dispatch(clearCredentials());
    navigate("/login");
  };

  registrarion = async (body: IRegistrationRequestBody) => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/registration`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Ошибка ${response.status}`);
    }
    return response.json();
  };
  registrationOnSuccess = (navigate: NavigateFunction) => {
    showSuccessToast("Успешная регистрация");
    navigate("/login");
  };
  login = async (body: ILoginRequestBody) => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Ошибка ${response.status}`);
    }
    return response.json();
  };
  loginOnSuccess = (
    data: ILoginResponseBody,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
  ) => {
    showSuccessToast("Успешная авторизация");
    dispatch(setCredentials({ user: data.user }));
    localStorage.setItem("accessToken", data.accessToken);
    navigate("/mainPage", { replace: true });
  };
  refreshRequest = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Ошибка ${response.status}`);
    }
    return response.json();
  };
  refreshOnSuccess = (data: IRefreshResponseBody) => {
    localStorage.setItem("accessToken", data.accessToken);
  };
  refreshOnError = (
    error: Error,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
  ) => {
    showErrorToast(error.message);
    localStorage.removeItem("accessToken");
    dispatch(clearCredentials());
    navigate("/login");
  };
  me = async () => {
    const token = localStorage.getItem("accessToken");
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401 || response.status === 403) {
      try {
        const refreshData = await this.refreshRequest();
        this.refreshOnSuccess(refreshData);
        const newToken = localStorage.getItem("accessToken");
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
        });
      } catch (refreshError) {
        showErrorToast((refreshError as Error).message);
      }
    }
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Ошибка ${response.status}`);
    }
    return response.json();
  };
  meOnSuccess = (
    data: IMeResponseBody,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
  ) => {
    dispatch(setCredentials({ user: createUserFromData(data.data) }));
    dispatch(setAuthenticated(true));
    navigate("/mainPage", { replace: true });
  };
  onError = (error: Error) => {
    showErrorToast(error.message);
  };
}

export default new AuthApi();
