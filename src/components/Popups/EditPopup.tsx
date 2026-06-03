import { useState, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import CustomSelect from "../shared/CustomSelect/CustomSelect";
import { addStatusOptions, statusMapping } from "../../constants/constants";
import { EGenre, EStatus } from "@yp-mentor/films-server-types";
import {
  validateDirector,
  validateGenres,
  validateRating,
  validateTitle,
  validateYear,
} from "./validation";
import { useClickEscape } from "../../hooks/useClickEscape";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import {
  setData,
  setErrors,
  setIsEditModalOpen,
  setIsRequesting,
} from "../../store/modalSlice";
import CustomInput from "../shared/CustomInput/CustomInput";
import CustomTextarea from "../shared/CustomTextarea/CustomTextarea";
import styles from "./Popup.module.css";
import CheckboxList from "../shared/CheckboxList/CheckboxList";
import { useEditFilmMutation } from "../../hooks/useEditFilmMutation";
import { createBodyForEditOrCreateFilmRequest } from "../../utils/utils";

const EditPopup = () => {
  const dispatch = useAppDispatch();
  const { data, isEditModalOpen, errors } = useAppSelector(
    (store) => store.modal,
  );
  const updateField = <T,>(key: string, value: T) => {
    dispatch(setData({ ...data, [key]: value }));
  };
  const updateError = (key: string, value: string) => {
    dispatch(setErrors({ ...errors, [key]: value }));
  };
  const [ratingInput, setRatingInput] = useState(
    data.rating !== 0 ? data.rating.toString() : "",
  );
  useClickEscape(isEditModalOpen);
  const editFilm = useEditFilmMutation(dispatch);
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    dispatch(setIsRequesting(true));
    editFilm.mutate({
      body: createBodyForEditOrCreateFilmRequest(data),
      filmId: data.id,
    });
  };

  if (!isEditModalOpen) return null;

  return createPortal(
    <div
      className={styles.popup_container}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          dispatch(setIsEditModalOpen(false));
        }
      }}
    >
      <form className={styles.popup_content} onSubmit={handleSubmit}>
        <div className={styles.popup_title}>
          <p>{"Редактировать фильм"}</p>
        </div>
        <button
          className={styles.popup_exit_button}
          onClick={() => {
            dispatch(setIsEditModalOpen(false));
          }}
        />
        <CustomInput
          value={data.title}
          title="Название фильма *"
          onChange={(event) => {
            updateField("title", event.target.value);
            updateError("title", validateTitle(event.target.value));
          }}
          error={errors.title}
        />
        <div className={styles.label_group}>
          <CustomInput
            value={data.year === 0 ? "" : data.year.toString()}
            title="Год выпуска *"
            onChange={(event) => {
              if (!event.target.value) {
                updateField("year", 0);
                return;
              }
              const numberValue = Number(event.target.value);
              if (!isNaN(numberValue)) {
                updateField("year", numberValue);
              }
              updateError("year", validateYear(event.target.value));
            }}
            style={{ width: "245px" }}
            error={errors.year}
          />
          <CustomInput
            value={data.director}
            title="Режиссёр *"
            onChange={(event) => {
              updateField("director", event.target.value);
              updateError("director", validateDirector(event.target.value));
            }}
            style={{ width: "245px" }}
            error={errors.director}
          />
        </div>
        <CheckboxList
          onChange={(value: EGenre, checked: boolean) => {
            const newGenres = checked
              ? [...data.genres, value]
              : data.genres.filter((g) => g !== value);
            updateField("genres", newGenres);
            updateError("genres", validateGenres(newGenres));
          }}
          title="Жанры *"
          error={errors.genres}
        />
        <div className={styles.label_group}>
          <CustomInput
            value={ratingInput}
            title="Рейтинг (1-10) *"
            onChange={(event) => {
              const value = event.target.value;
              if (!value) {
                setRatingInput("");
                updateField("rating", 0);
                updateError("rating", validateRating(""));
                return;
              }
              const isValidFormat = /^\d*$|^\d+\.$|^\d+\.\d$/.test(value);
              if (isValidFormat) {
                setRatingInput(value);
                if (value !== "." && !value.endsWith(".")) {
                  const numberValue = parseFloat(value);
                  if (!isNaN(numberValue)) {
                    updateField("rating", numberValue);
                  }
                }
                updateError("rating", validateRating(value));
              }
            }}
            style={{ width: "245px" }}
            error={errors.rating}
          />
          <CustomSelect
            value={{ value: data.status, label: statusMapping[data.status] }}
            options={addStatusOptions}
            title="Статус просмотра"
            style={{ width: "250px" }}
            onChange={(option: { value: EStatus; label: string }) => {
              updateField("status", option.value);
            }}
          />
        </div>
        <CustomInput
          value={data.image ? data.image : ""}
          title="URL постера"
          onChange={(event) => {
            updateField("image", event.target.value);
          }}
          placeholder="https://example.com/poster.jpg"
        />
        <CustomTextarea
          title="Описание"
          value={data.description ? data.description : ""}
          onChange={(event) => {
            updateField("description", event.target.value);
          }}
        />
        <div className={styles.button_container}>
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsEditModalOpen(false));
            }}
          >
            <p>Отмена</p>
          </button>
          <button
            className={`${styles.button} ${styles.submit_button}`}
            type="submit"
            disabled={editFilm.isPending}
          >
            <p>Сохранить</p>
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("modal")!,
  );
};

export default EditPopup;
