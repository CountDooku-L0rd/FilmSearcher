import { EGenre, EStatus } from "@yp-mentor/films-server-types";
import {
  genreOptions,
  ratingOptions,
  statusOptions,
} from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";
import {
  setGenreValue,
  setPage,
  setRatingValue,
  setStatusValue,
} from "../../../store/filterSlice";
import YearInput from "../YearInput/YearInput";
import ClearFilterButton from "../ClearFilterButton/ClearFilterButton";

const FilterPanel = () => {
  const dispatch = useAppDispatch();
  const { genreValue, statusValue, ratingValue } = useAppSelector(
    (store) => store.filter,
  );
  return (
    <>
      <CustomSelect
        options={genreOptions}
        value={genreValue}
        onChange={(option: { value: EGenre; label: string }) => {
          dispatch(setGenreValue(option));
          dispatch(setPage(1));
        }}
        title={"Жанр"}
        style={{ width: "225px" }}
      />
      <CustomSelect
        options={statusOptions}
        value={statusValue}
        onChange={(option: { value: EStatus; label: string }) => {
          dispatch(setStatusValue(option));
          dispatch(setPage(1));
        }}
        title={"Статус просмотра"}
        style={{ width: "160px" }}
      />
      <CustomSelect
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
      <ClearFilterButton />
    </>
  );
};

export default FilterPanel;
