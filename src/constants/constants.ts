export const BASE_URL = "http://localhost:3000";

export const genreOptions: { value: string; label: string }[] = [
  { value: "allGenres", label: "Все жанры" },
  { value: "0", label: "Драма" },
  { value: "1", label: "Комедия" },
  { value: "2", label: "Экшен" },
  { value: "3", label: "Фэнтези" },
  { value: "4", label: "Триллер" },
  { value: "5", label: "Хоррор" },
  { value: "6", label: "Мелодрама" },
  { value: "7", label: "Приключение" },
  { value: "8", label: "Детектив" },
];

export const statusOptions: { value: string; label: string }[] = [
  { value: "allStatuses", label: "Все статусы" },
  { value: "1", label: "Просмотрено" },
  { value: "0", label: "В планах" },
];

export const ratingOptions: { value: string; label: string }[] = [
  { value: "anyRating", label: "Любой рейтинг" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

export const sortingBy: { value: string; label: string }[] = [
  { value: "3", label: "Названию" },
  { value: "0", label: "Году выпуска" },
  { value: "1", label: "Рейтингу" },
  { value: "2", label: "Дате добавления" },
];

export const sortingOrders: { value: string; label: string }[] = [
  { value: "1", label: "По убыванию" },
  { value: "0", label: "По возрастанию" },
];