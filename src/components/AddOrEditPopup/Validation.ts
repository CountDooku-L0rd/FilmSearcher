import type { EGenre } from "@yp-mentor/films-server-types";

export const validateTitle = (value: string) => {
  if (!value.trim()) return "Необходимо указать название фильма";
  return "";
};

export const validateYear = (value: string) => {
  if (!value) return "Необходимо указать год выпуска";
  const year = parseInt(value);
  const currentYear = new Date().getFullYear();
  if (isNaN(year)) return "Введите корректный год";
  if (year < 1900) return "Год должен быть не раньше 1900";
  if (year > currentYear) return `Год не может быть больше ${currentYear}`;
  return "";
};

export const validateDirector = (value: string) => {
  if (!value.trim()) return "Необходимо указать режиссера";
  return "";
};

export const validateGenres = (value: EGenre[]) => {
  if (!value || value.length === 0)
    return "Необходимо указать хотя бы один жанр";
  return "";
};

export const validateRating = (value: string) => {
  if (!value) return "Необходимо указать рейтинг";
  const ratingNum = parseFloat(value);
  if (ratingNum < 1) return "Рейтинг должен быть от 1 до 10";
  if (ratingNum > 10) return "Рейтинг должен быть от 1 до 10";
  return "";
};
