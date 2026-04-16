import styles from "./FilterSection.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import CustomSelector from "../CustomSelector/CustomSelect.tsx";
import {
  genreOptions,
  ratingOptions,
  sortingBy,
  sortingOrders,
  statusOptions,
} from "../../constants/constants.ts";
import YearInput from "./YearInput/YearInput.tsx";
import {
  setEndYear,
  setGenreValue,
  setRatingValue,
  setSortBy,
  setSortingOrder,
  setStartYear,
  setStatusValue,
} from "../../store/filterSlice.ts";

const FilterSection = () => {
  const { isSortOpen, isFilterOpen } = useAppSelector((store) => store.sort);
  const dispatch = useAppDispatch();
  const { genreValue, statusValue, ratingValue, sortBy, sortingOrder } = useAppSelector(
    (store) => store.filter,
  );
  const handleGenre = (option: { value: string; label: string }) => {
    dispatch(setGenreValue({ value: option.value, label: option.label }));
  };
  const handleStatus = (option: { value: string; label: string }) => {
    dispatch(setStatusValue({ value: option.value, label: option.label }));
  };
  const handleRating = (option: { value: string; label: string }) => {
    dispatch(setRatingValue({ value: option.value, label: option.label }));
  };
  const handleClearFilters = () => {
    dispatch(setGenreValue({ value: "allGenres", label: "Все жанры" }));
    dispatch(setStatusValue({ value: "allStatuses", label: "Все статусы" }));
    dispatch(setRatingValue({ value: "allRatings", label: "Любой рейтинг" }));
    dispatch(setStartYear(null));
    dispatch(setEndYear(null));
  };
  const handleSortBy = (option: { value: string; label: string }) => {
    dispatch(setSortBy({ value: option.value, label: option.label }));
  };
  const handleSortOrder = (option: { value: string; label: string }) => {
    dispatch(setSortingOrder({ value: option.value, label: option.label }));
  };
  return (
    <>
      {isSortOpen || isFilterOpen ? (
        <section className={styles.section}>
          {isSortOpen && (
            <>
              <CustomSelector
                options={sortingBy}
                value={sortBy}
                onChange={handleSortBy}
                title={"Сортировать по"}
                width={166}
              />
              <CustomSelector
                options={sortingOrders}
                value={sortingOrder}
                onChange={handleSortOrder}
                title={"Порядок сортировки"}
                width={235}
              />
            </>
          )}
          {isFilterOpen && (
            <>
              <CustomSelector
                options={genreOptions}
                value={genreValue}
                onChange={handleGenre}
                title={"Жанр"}
                width={224}
              />
              <CustomSelector
                options={statusOptions}
                value={statusValue}
                onChange={handleStatus}
                title={"Статус просмотра"}
                width={145}
              />
              <CustomSelector
                options={ratingOptions}
                value={ratingValue}
                onChange={handleRating}
                title={"Минимальный рейтинг"}
                width={235}
              />
              <YearInput />
              <button className={styles.button} onClick={handleClearFilters}>
                Сбросить фильтры
              </button>
            </>
          )}
        </section>
      ) : (
        <section />
      )}
    </>
  );
};

export default FilterSection;
