import {
  useMemo,
  useState,
  type MouseEventHandler,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import type { AddOrEditPopupTypes } from "./types/AddOrEditPopupTypes";
import CustomSelect from "../CustomSelector/CustomSelect";
import { addStatusOptions, genreOptions } from "../../constants/constants";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { EGenre, EStatus } from "@yp-mentor/films-server-types";
import { showErrorToast } from "../../toasts/toasts";
import {
  validateDirector,
  validateGenres,
  validateRating,
  validateTitle,
  validateYear,
} from "./validation";
import { useClickEscape } from "../../hooks/useClickEscape";

const AddOrEditPopup = ({
  data,
  onClose,
  onSubmit,
  isModalOpen,
}: AddOrEditPopupTypes) => {
  const [title, setTitle] = useState(data ? data.title : "");
  const [year, setYear] = useState(data ? data.year.toString() : "");
  const [director, setDirector] = useState(data ? data.director : "");
  const [genres, setGenres] = useState<EGenre[]>(data ? data.genres : []);
  const [rating, setRating] = useState(data ? data.rating.toString() : "");
  const [status, setStatus] = useState(
    data
      ? {
          value: data.status,
          label: data.status === EStatus.in_plans ? "В планах" : "Просмотрено",
        }
      : {
          value: EStatus.in_plans,
          label: "В планах",
        },
  );
  const [image, setImage] = useState(data ? data.image : '');
  const [description, setDescription] = useState(data ? data.description : '');
  const [errors, setErrors] = useState({
    title: "",
    year: "",
    director: "",
    genres: "",
    rating: "",
  });
  const [isRequesting, setIsRequesting] = useState(false);

  useClickEscape(onClose, isModalOpen)

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const titleError = useMemo(
    () => validateTitle(title),
    [title, validateTitle],
  );
  const yearError = useMemo(
    () => validateYear(year),
     [year, validateYear]
  );
  const directorError = useMemo(
    () => validateDirector(director),
    [director, validateDirector],
  );
  const genresError = useMemo(
    () => validateGenres(genres),
    [genres, validateGenres],
  );
  const ratingError = useMemo(
    () => validateRating(rating),
    [rating, validateRating],
  );

  const isFormValid =
    !titleError && !yearError && !directorError && !genresError && !ratingError;

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Пожалуйста, исправьте ошибки в форме");
      return;
    }
    setIsRequesting(true);
    onSubmit(
      {
        title: title,
        director: director,
        year: parseInt(year),
        genres: genres,
        description: description,
        image: image,
        rating: parseFloat(rating),
        status: status.value,
      },
      data ? data.id.toString() : undefined,
    )
      .then(() => {
        onClose();
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
  };

  return createPortal(
    <div className="popup_container" onClick={handleOverlayClick}>
      <form className="popup_content" onSubmit={handleSubmit}>
        <div className="popup_title">
          <p>{data ? "Редактировать фильм" : "Добавить фильм"}</p>
        </div>
        <button
          className="popup_exit_button"
          onClick={() => {
            onClose();
          }}
        ></button>
        <label className="label">
          <p className="input_title">Название фильма *</p>
          <input
            value={title}
            className="input"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({
                ...prev,
                title: validateTitle(e.target.value),
              }));
            }}
          />
          {errors.title && <p className="Error">{errors.title}</p>}
        </label>
        <div className="label_group">
          <label className="label">
            <p className="input_title">Год выпуска *</p>
            <input
              value={year}
              className="input mini_input"
              type="number"
              onChange={(e) => {
                setYear(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  year: validateYear(e.target.value),
                }));
              }}
            />
            {errors.year && <p className="Error">{errors.year}</p>}
          </label>
          <label className="label">
            <p className="input_title">Режиссёр *</p>
            <input
              value={director}
              className="input mini_input"
              type="text"
              onChange={(e) => {
                setDirector(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  director: validateDirector(e.target.value),
                }));
              }}
            />
            {errors.director && <p className="Error">{errors.director}</p>}
          </label>
        </div>
        <div className="label">
          <p>Жанры *</p>
          <ul className="list">
            {genreOptions.map((item) =>
              item.value !== EGenre.all ? (
                <CustomCheckbox
                  isChecked={genres.includes(item.value)}
                  onChange={(value: EGenre, checked: boolean) => {
                    const newGenres = checked
                      ? [...genres, value]
                      : genres.filter((g) => g !== value);
                    setGenres(newGenres);
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
          {errors.genres && <p className="Error">{errors.genres}</p>}
        </div>
        <div className="label_group">
          <label className="label">
            <p className="input_title">Рейтинг (1-10) *</p>
            <input
              value={rating}
              className="input mini_input"
              type="number"
              onChange={(e) => {
                setRating(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  rating: validateRating(e.target.value),
                }));
              }}
            />
            {errors.rating && <p className="Error">{errors.rating}</p>}
          </label>
          <CustomSelect
            value={status}
            options={addStatusOptions}
            title="Статус просмотра"
            style={{width: '250px'}}
            onChange={(option: { value: EStatus; label: string }) => {
              setStatus(option);
            }}
          />
        </div>
        <label className="label">
          <p className="input_title">URL постера</p>
          <input
            value={image}
            className="input"
            type="text"
            placeholder="https://example.com/poster.jpg"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <p className="input_title">Описание</p>
          <textarea
            value={description}
            className="input textarea"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <div className="button_container">
          <button
            className="button"
            onClick={() => {
              onClose();
            }}
          >
            <p>Отмена</p>
          </button>
          <button
            className=" button submit_button"
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

export default AddOrEditPopup;
