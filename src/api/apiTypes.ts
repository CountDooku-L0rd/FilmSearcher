export interface IGetFilmsRequest {
  filters?: {
    genres: EGenres[];
    status: EStatuses;
    minRating: number;
    yearRange: { from: number; to?: number } | { from?: number; to: number };
  };
  sort?: {
    field: ESortFields;
    order: ESortOrders;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface IFilm {
  id: number;
  title: string;
  director: string;
  year: number;
  createdAt: string;
  genres: EGenres[];
  description: string;
  image: string;
  rating: number;
  status: EStatuses;
}

export interface IStatistic {
  total: number;
  watched: number;
  averageRating: number;
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface IGetFilmsSuccessResponse {
  success: true;
  data: IFilm[];
  pagination: IPagination;
  statistic: IStatistic;
}

export interface IGetFilmsErrorResponse {
  success: false;
  errorMessage: string;
}

export type GetFilmsResponseType =
  | IGetFilmsErrorResponse
  | IGetFilmsSuccessResponse;

export enum EGenres {
  drama,
  comedy,
  action,
  fantasy,
  thriller,
  horror,
  melodrama,
  adventure,
  detective,
}

export enum EStatuses {
  in_plans,
  watched,
}

export enum ESortOrders {
  asc,
  desc,
}

export enum ESortFields {
  year,
  rating,
  createdAt,
  title,
}
