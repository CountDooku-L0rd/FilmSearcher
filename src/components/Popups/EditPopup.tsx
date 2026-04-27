import { useState, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import CustomSelect from "../CustomSelect/CustomSelect";
import {
  addStatusOptions,
  genreOptions,
  statusMapping,
} from "../../constants/constants";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
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
import { setData, setIsEditModalOpen } from "../../store/modalSlice";
import { filmService } from "../../api/FilmsService";
import { useGetFilms } from "../../hooks/useGetFilms";
import PopupLabel from "./PopupLabel/PopupLabel";
import PopupTextarea from "./PopupTextarea/PopupTextarea";
import styles from "./Popup.module.css";

const EditPopup = () => {
  const { getFilms } = useGetFilms();
  const dispatch = useAppDispatch();
  const { data, isEditModalOpen } = useAppSelector((store) => store.modal);
  const updateField = <T,>(key: string, value: T) => {
    dispatch(setData({ ...data, [key]: value }));
  };
  const [errors, setErrors] = useState({
    title: "",
    year: "",
    director: "",
    genres: "",
    rating: "",
  });
  const [isRequesting, setIsRequesting] = useState(false);
  useClickEscape(isEditModalOpen);

  const titleError = validateTitle(data.title);
  const yearError = validateYear(data.year.toString());
  const directorError = validateDirector(data.director);
  const genresError = validateGenres(data.genres);
  const ratingError = validateRating(data.rating.toString());
  const isFormValid =
    !titleError && !yearError && !directorError && !genresError && !ratingError;

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    setIsRequesting(true);
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
    const id = data.id.toString();

    if (id) {
      filmService
        .updateFilm({ body, id })
        .then(() => {
          showSuccessToast("Данные фильма успешно изменены");
          getFilms();
          dispatch(setIsEditModalOpen(false));
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
          setIsRequesting(false);
        });
    } else {
      showErrorToast("Ошибка, ID помер");
      setIsRequesting(false);
    }
  };

  if (!isEditModalOpen) return null;

  return createPortal(
    <div
      className={styles.popup_container}
      onClick={(event) => {
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
        <PopupLabel
          value={data.title}
          title="Название фильма *"
          onChange={(event) => {
            updateField("title", event.target.value);
            setErrors((prev) => ({
              ...prev,
              title: validateTitle(event.target.value),
            }));
          }}
          error={errors.title}
        />
        <div className={styles.label_group}>
          <PopupLabel
            value={data.year === 0 ? "" : data.year.toString()}
            title="Год выпуска *"
            onChange={(event) => {
              updateField("year", parseInt(event.target.value));
              setErrors((prev) => ({
                ...prev,
                year: validateYear(event.target.value),
              }));
            }}
            style={{ width: "245px" }}
            error={errors.year}
          />
          <PopupLabel
            value={data.director}
            title="Режиссёр *"
            onChange={(event) => {
              updateField("director", event.target.value);
              setErrors((prev) => ({
                ...prev,
                director: validateDirector(event.target.value),
              }));
            }}
            style={{ width: "245px" }}
            error={errors.director}
          />
        </div>
        <div className={styles.label}>
          <p>Жанры *</p>
          <ul className={styles.list}>
            {genreOptions.map((item) =>
              item.value !== EGenre.all ? (
                <CustomCheckbox
                  isChecked={data.genres.includes(item.value)}
                  onChange={(value: EGenre, checked: boolean) => {
                    const newGenres = checked
                      ? [...data.genres, value]
                      : data.genres.filter((g) => g !== value);
                    updateField("genres", newGenres);
                    setErrors((prev) => ({
                      ...prev,
                      genres: validateGenres(newGenres),
                    }));
                  }}
                  value={item}
                />
              ) : null,
            )}
          </ul>
          {errors.genres && <p className={styles.error}>{errors.genres}</p>}
        </div>
        <div className={styles.label_group}>
          <PopupLabel
            value={data.rating === 0 ? "" : data.rating.toString()}
            title="Рейтинг (1-10) *"
            onChange={(event) => {
              updateField("rating", parseFloat(event.target.value));
              setErrors((prev) => ({
                ...prev,
                rating: validateRating(event.target.value),
              }));
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
              dispatch(setIsEditModalOpen(false));
            }}
          >
            <p>Отмена</p>
          </button>
          <button
            className={`${styles.button} ${styles.submit_button}`}
            type="submit"
            disabled={isRequesting || !isFormValid}
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
