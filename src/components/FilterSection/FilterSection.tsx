import styles from "./FilterSection.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks.ts";
import CustomSelector from "../CustomSelector/CustomSelect.tsx";
import {genreOptions, ratingOptions, sortingBy, sortingOrders, statusOptions,} from "../../constants/constants.ts";
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
import {EGenre, ESortField, ESortOrder, EStatus} from "@yp-mentor/films-server-types";

const FilterSection = () => {
  const { isSortOpen, isFilterOpen } = useAppSelector((store) => store.sort);
  const dispatch = useAppDispatch();
  const { genreValue, statusValue, ratingValue, sortBy, sortingOrder } = useAppSelector(
    (store) => store.filter,
  );
  const handleGenre = (option: { value: string; label: string }) => {
    dispatch(setGenreValue(parseInt(option.value)));
  };
  const handleStatus = (option: { value: string; label: string }) => {
    dispatch(setStatusValue(parseInt(option.value)));
  };
  const handleRating = (option: { value: string; label: string }) => {
    dispatch(setRatingValue({ value: option.value, label: option.label }));
  };
  const handleClearFilters = () => {
    dispatch(setGenreValue(null));
    dispatch(setStatusValue(null));
    dispatch(setRatingValue({ value: "allRatings", label: "Любой рейтинг" }));
    dispatch(setStartYear(null));
    dispatch(setEndYear(null));
  };
  const handleSortBy = (option: { value: string; label: string }) => {
    dispatch(setSortBy(parseInt(option.value)));
  };
  const handleSortOrder = (option: { value: string; label: string }) => {
    dispatch(setSortingOrder(parseInt(option.value)));
  };
  const sortByMap = (sortBy: ESortField) => {
    if (sortBy === ESortField.year) {
      return 'Году выпуска'
    }
    if (sortBy === ESortField.title){
      return 'Названию'
    }
    if (sortBy === ESortField.rating){
      return  'Рейтингу'
    }
    return 'Дате добавления'
  }
  const sortOrderMap = (sortOrder: ESortOrder) => {
    if (sortOrder === ESortOrder.desc){
      return 'По убыванию'
    }
    return 'По возрастанию'
  }
  const  statusMap = (status: EStatus) => {
    if (status === EStatus.watched){
      return 'Просмотрено'
    }
    if (status === EStatus.in_plans){
      return 'В планах'
    }
    return 'Все статусы'
  }
  const genreMap = (genre: EGenre) => {
    if (genre===EGenre.action){
      return 'Экшен'
    }
    if (genre===EGenre.comedy){
      return 'Комедия'
    }
    if (genre===EGenre.drama){
      return 'Драма'
    }
    if (genre===EGenre.adventure){
      return 'Приключение'
    }
    if (genre===EGenre.fantasy){
      return 'Фэнтези'
    }
    if (genre===EGenre.detective){
      return 'Детектив'
    }
    if (genre===EGenre.horror){
      return 'Хоррор'
    }
    if (genre===EGenre.melodrama){
      return 'Мелодрама'
    }
    if (genre===EGenre.thriller){
      return 'Триллер'
    }
    return 'Все жанры'
  }
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
                getLabel={(item) => sortByMap(item)}
              />
              <CustomSelector
                options={sortingOrders}
                value={sortingOrder}
                onChange={handleSortOrder}
                title={"Порядок сортировки"}
                width={235}
                getLabel={item => sortOrderMap(item)}
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
                getLabel={item => genreMap(item)}
              />
              <CustomSelector
                options={statusOptions}
                value={statusValue}
                onChange={handleStatus}
                title={"Статус просмотра"}
                width={145}
                getLabel={item => statusMap(item)}
              />
              <CustomSelector
                options={ratingOptions}
                value={ratingValue}
                onChange={handleRating}
                title={"Минимальный рейтинг"}
                width={235}
                getLabel={(item: {value: string, label:string}) => item.label}
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
