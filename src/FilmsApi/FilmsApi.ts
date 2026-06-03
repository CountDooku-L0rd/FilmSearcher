import type { AppDispatch } from "../store/store";
import { setIsServerRequest, setIsUpdating } from "../store/mainSlice";
import { showErrorToast, showSuccessToast } from "../toasts/toasts";
import type { EStatus, FilmsAPI } from "@yp-mentor/films-server-types";
import { queryClient } from "./queryClient";
import { setIsAddModalOpen, setIsEditModalOpen } from "../store/modalSlice";
import type { CreateOrUpdateFilmRequestBodyType } from "../types/apiTypes";

type GetFilmsRequestType = Parameters<FilmsAPI["getFilms"]>[0]["body"];

class FilmsApi {
  deleteFilmRequest = async (dispatch: AppDispatch, filmId: number) => {
    dispatch(setIsUpdating(true));
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/deleteFilm/${filmId}`,
      {
        method: "DELETE",
        headers: {
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

  onSettled = (dispatch: AppDispatch) => {
    dispatch(setIsServerRequest(false));
    dispatch(setIsUpdating(false));
  };

  deleteFilmOnSuccess = () => {
    showSuccessToast("Фильм успешно удалён");
    queryClient.invalidateQueries({ queryKey: ["films"] });
  };

  getFilms = async (body: GetFilmsRequestType) => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getFilms`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message);
    }
    return response.json();
  };
  editFilmRequest = async (
    filmId: number,
    body: CreateOrUpdateFilmRequestBodyType,
    dispatch: AppDispatch,
  ) => {
    dispatch(setIsUpdating(true));
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/updateFilm/${filmId.toString()}`,
      {
        method: "PUT",
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
  editFilmOnSuccess = (dispatch: AppDispatch) => {
    showSuccessToast("Фильм успешно обновлён");
    queryClient.invalidateQueries({ queryKey: ["films"] });
    dispatch(setIsEditModalOpen(false));
  };

  changeFilmStatusRequest = async (
    filmId: number,
    changeStatus: EStatus,
    dispatch: AppDispatch,
  ) => {
    dispatch(setIsUpdating(true));
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/changeFilmStatus/${filmId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: changeStatus,
        }),
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
  changeFilmStatusOnSuccess = () => {
    showSuccessToast("Статус фильма успешно изменён");
    queryClient.invalidateQueries({ queryKey: ["films"] });
  };
  createFilmRequest = async (body: CreateOrUpdateFilmRequestBodyType, dispatch: AppDispatch) => {
    dispatch(setIsUpdating(true));
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/createFilm`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Ошибка ${response.status}`);
    }
    return response.json();
  };

  createFilmOnSuccess = (dispatch: AppDispatch) => {
    showSuccessToast("Фильм успешно добавлен");
    queryClient.invalidateQueries({ queryKey: ["films"] });
    dispatch(setIsAddModalOpen(false));
  };
  onError = (error: Error) => {
    showErrorToast(error.message);
  };
}

export default new FilmsApi();
