import { type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import CustomSelect from "../CustomSelect/CustomSelect";
import { addStatusOptions, statusMapping } from "../../constants/constants";
import { EGenre, EStatus } from "@yp-mentor/films-server-types";
import { showErrorToast, showSuccessToast } from "../../toasts/toasts";
import {
  validateDirector,
  validateGenres,
  validateRating,
  validateTitle,
  validateYear,
} from "./validation";
import { useClickEscape } from "../../hooks/useClickEscape";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setData, setErrors, setIsAddModalOpen, setIsRequesting } from "../../store/modalSlice";
import { filmService } from "../../api/FilmsService";
import { useGetFilms } from "../../hooks/useGetFilms";
import styles from "./Popup.module.css";
import PopupLabel from "./PopupLabel/PopupLabel";
import PopupTextarea from "./PopupTextarea/PopupTextarea";
import CheckboxList from "./CheckboxList/CheckboxList";

const AddPopup = () => {
  const { getFilms } = useGetFilms();
  const dispatch = useAppDispatch();
  const updateField = <T,>(key: string, value: T) => {
    dispatch(setData({ ...data, [key]: value }));
  };
  const updateError = (key: string, value: string) => {
    dispatch(setErrors({ ...errors, [key]: value }));
  };
  const { data, isAddModalOpen, errors, isRequesting } = useAppSelector(
    (store) => store.modal,
  );

  useClickEscape(isAddModalOpen);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    dispatch(setIsRequesting(true));
    const body = {
      title: data.title,
      director: data.director,
      year: data.year,
      genres: data.genres,
      description: data.description,
      image: data.image,
      rating: data.rating,
      status: data.status,
    };
    filmService
      .createFilm({ body })
      .then(() => {
        showSuccessToast("Фильм успешно добавлен");
        getFilms();
        dispatch(setIsAddModalOpen(false));
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          showErrorToast(error.message);
        } else {
          showErrorToast(error as string);
        }
        console.error(error);
      })
      .finally(() => {
        dispatch(setIsRequesting(false));
      });
  };

  if (!isAddModalOpen) return null;

  return createPortal(
    <div
      className={styles.popup_container}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dispatch(setIsAddModalOpen(false));
        }
      }}
    >
      <form className={styles.popup_content} onSubmit={handleSubmit}>
        <div className={styles.popup_title}>
          <p>{"Добавить фильм"}</p>
        </div>
        <button
          className={styles.popup_exit_button}
          onClick={() => {
            dispatch(setIsAddModalOpen(false));
          }}
        />
        <PopupLabel
          value={data.title}
          title="Название фильма *"
          onChange={(event) => {
            updateField("title", event.target.value);
            updateError("title", validateTitle(event.target.value));
          }}
          error={errors.title}
        />
        <div className={styles.label_group}>
          <PopupLabel
            value={data.year === 0 ? "" : data.year.toString()}
            title="Год выпуска *"
            onChange={(event) => {
              if (event.target.value === "") {
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
          <PopupLabel
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
          <PopupLabel
            value={data.rating === 0 ? "" : data.rating.toString()}
            title="Рейтинг (1-10) *"
            onChange={(event) => {
              if (event.target.value === "") {
                updateField("rating", 0);
                return;
              }
              const numberValue = Number(event.target.value);
              if (!isNaN(numberValue)) {
                updateField("rating", numberValue);
              }
              updateError("rating", validateRating(event.target.value));
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
        <PopupLabel
          value={data.image ? data.image : ""}
          title="URL постера"
          onChange={(event) => {
            updateField("image", event.target.value);
          }}
          placeholder="https://example.com/poster.jpg"
        />
        <PopupTextarea
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
              dispatch(setIsAddModalOpen(false));
            }}
          >
            <p>Отмена</p>
          </button>
          <button
            className={`${styles.button} ${styles.submit_button}`}
            type="submit"
            disabled={isRequesting}
          >
            <p>Сохранить</p>
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("modal")!,
  );
};

export default AddPopup;
