import type { FilterState } from "../store/filterSlice";

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
    body: {
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
                from: filtersSlice.startYear
                  ? filtersSlice.startYear
                  : undefined,
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
    },
  };
};
