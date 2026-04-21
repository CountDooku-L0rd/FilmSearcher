import {
  EGenre,
  ESortField,
  ESortOrder,
  EStatus,
} from "@yp-mentor/films-server-types";

export const BASE_URL = "http://localhost:3000";

export const genreOptions: { value: EGenre; label: string }[] = [
  { value: EGenre.all, label: "Все жанры" },
  { value: EGenre.drama, label: "Драма" },
  { value: EGenre.comedy, label: "Комедия" },
  { value: EGenre.action, label: "Экшен" },
  { value: EGenre.fantasy, label: "Фэнтези" },
  { value: EGenre.thriller, label: "Триллер" },
  { value: EGenre.horror, label: "Хоррор" },
  { value: EGenre.melodrama, label: "Мелодрама" },
  { value: EGenre.adventure, label: "Приключение" },
  { value: EGenre.detective, label: "Детектив" },
];

export const statusOptions: { value: EStatus; label: string }[] = [
  { value: EStatus.all, label: "Все статусы" },
  { value: EStatus.watched, label: "Просмотрено" },
  { value: EStatus.in_plans, label: "В планах" },
];

export const addStatusOptions: { value: EStatus; label: string }[] = [
  { value: EStatus.watched, label: "Просмотрено" },
  { value: EStatus.in_plans, label: "В планах" },
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

export const sortingBy: { value: ESortField; label: string }[] = [
  { value: ESortField.title, label: "Названию" },
  { value: ESortField.year, label: "Году выпуска" },
  { value: ESortField.rating, label: "Рейтингу" },
  { value: ESortField.createdAt, label: "Дате добавления" },
];

export const sortingOrders: { value: ESortOrder; label: string }[] = [
  { value: ESortOrder.desc, label: "По убыванию" },
  { value: ESortOrder.asc, label: "По возрастанию" },
];
