import type { IMeResponseData } from "../AuthApi/types/AuthApiTypes";
import type { FilterState } from "../store/filterSlice";
import type { IFilm } from "../store/modalSlice";

export const debounce = <T extends (...args: never[]) => unknown>(
  func: T,
  ms: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutTimer: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }
    timeoutTimer = setTimeout(() => func.apply(this, args), ms);
  };
};

export const createBodyForGetFilmsRequest = (filtersSlice: FilterState) => {
  return {
    filters: {
      genre: filtersSlice.genreValue.value,
      minRating:
        filtersSlice.ratingValue.value === 0
          ? undefined
          : filtersSlice.ratingValue.value,
      status: filtersSlice.statusValue.value,
      yearRange: filtersSlice.startYear
        ? {
            from: filtersSlice.startYear,
            to: filtersSlice.endYear ? filtersSlice.endYear : undefined,
          }
        : filtersSlice.endYear
          ? {
              from: filtersSlice.startYear ? filtersSlice.startYear : undefined,
              to: filtersSlice.endYear,
            }
          : undefined,
    },
    sort: {
      field: filtersSlice.sortBy.value,
      order: filtersSlice.sortingOrder.value,
    },
    searchString: filtersSlice.searchString
      ? filtersSlice.searchString
      : undefined,
    pagination: {
      page: filtersSlice.page,
      pageSize: filtersSlice.pageSize,
    },
  };
};

export const createBodyForEditOrCreateFilmRequest = (data: IFilm) => {
  return {
    title: data.title,
    director: data.director,
    year: data.year,
    genres: data.genres,
    description: data.description,
    image: data.image,
    rating: data.rating,
    status: data.status,
  };
};

export const createBodyForRegistrationRequest = (formData: FormData) => {
  return {
    username: formData.get("username")!.toString(),
    password: formData.get("password")!.toString(),
    email: formData.get("email")!.toString(),
    confirmPassword: formData.get("confirmPassword")!.toString(),
  };
};

export const createBodyForLoginRequest = (formData: FormData) => {
  return {
    username: formData.get("username")!.toString(),
    password: formData.get("password")!.toString(),
  };
};

export const createUserFromData = (data: IMeResponseData) => {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    role: data.role,
  }
}