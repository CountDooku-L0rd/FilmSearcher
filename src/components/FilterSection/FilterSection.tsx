import styles from "./FilterSection.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import CustomSelector from "../CustomSelect/CustomSelect.tsx";
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
  setPage,
  setRatingValue,
  setSortBy,
  setSortingOrder,
  setStartYear,
  setStatusValue,
} from "../../store/filterSlice.ts";
import {
  EGenre,
  ESortField,
  ESortOrder,
  EStatus,
} from "@yp-mentor/films-server-types";

const FilterSection = () => {
  const { isSortOpen, isFilterOpen } = useAppSelector((store) => store.sort);
  const dispatch = useAppDispatch();
  const { genreValue, statusValue, ratingValue, sortBy, sortingOrder } =
    useAppSelector((store) => store.filter);
  return (
    <>
      {isSortOpen || isFilterOpen ? (
        <section className={styles.section}>
          {isSortOpen && (
            <>
              <CustomSelector
                options={sortingBy}
                value={sortBy}
                onChange={(option: { value: ESortField; label: string }) => {
                  dispatch(setSortBy(option));
                  dispatch(setPage(1));
                }}
                title={"Сортировать по"}
                style={{ width: "180px" }}
              />
              <CustomSelector
                options={sortingOrders}
                value={sortingOrder}
                onChange={(option: { value: ESortOrder; label: string }) => {
                  dispatch(setSortingOrder(option));
                  dispatch(setPage(1));
                }}
                title={"Порядок сортировки"}
                style={{ width: "235px" }}
              />
            </>
          )}
          {isFilterOpen && (
            <>
              <CustomSelector
                options={genreOptions}
                value={genreValue}
                onChange={(option: { value: EGenre; label: string }) => {
                  dispatch(setGenreValue(option));
                  dispatch(setPage(1));
                }}
                title={"Жанр"}
                style={{ width: "225px" }}
              />
              <CustomSelector
                options={statusOptions}
                value={statusValue}
                onChange={(option: { value: EStatus; label: string }) => {
                  dispatch(setStatusValue(option));
                  dispatch(setPage(1));
                }}
                title={"Статус просмотра"}
                style={{ width: "160px" }}
              />
              <CustomSelector
                options={ratingOptions}
                value={ratingValue}
                onChange={(option: { value: number; label: string }) => {
                  dispatch(
                    setRatingValue({
                      value: option.value,
                      label: option.label,
                    }),
                  );
                  dispatch(setPage(1));
                }}
                title={"Минимальный рейтинг"}
                style={{ width: "235px" }}
              />
              <YearInput />
              <button
                className={styles.button}
                onClick={() => {
                  dispatch(
                    setGenreValue({ value: EGenre.all, label: "Все жанры" }),
                  );
                  dispatch(
                    setStatusValue({
                      value: EStatus.all,
                      label: "Все статусы",
                    }),
                  );
                  dispatch(
                    setRatingValue({ value: 0, label: "Любой рейтинг" }),
                  );
                  dispatch(setStartYear(null));
                  dispatch(setEndYear(null));
                  dispatch(setPage(1));
                }}
              >
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
