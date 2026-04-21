import {
  useEffect,
  useState,
  type FormEvent,
  type MouseEventHandler,
} from "react";
import { createPortal } from "react-dom";
import type { AddOrEditPopupProps } from "./props/AddOrEditPopupProps";
import CustomSelect from "../CustomSelector/CustomSelect";
import { addStatusOptions, genreOptions } from "../../constants/constants";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { EGenre, EStatus } from "@yp-mentor/films-server-types";

const AddOrEditPopup = ({
  data,
  onClose,
  onSubmit,
  isModalOpen,
}: AddOrEditPopupProps) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [genres, setGenres] = useState<EGenre[]>([]);
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState({
    value: EStatus.in_plans,
    label: "В планах",
  });
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    year: "",
    director: "",
    genres: "",
    rating: "",
  });
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        onClose();
      }
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("click", handleKeyDown as EventListener);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!data) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(data.title);
    setYear(data.year.toString());
    setDirector(data.director);
    setGenres(data.genres || []);
    setRating(data.rating.toString());
    setStatus({
      value: data.status,
      label: data.status === EStatus.in_plans ? "В планах" : "Просмотрено",
    });
    setImage(data.image || "");
    setDescription(data.description || "");
  }, [data]);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  if (!isModalOpen) return null;

  const validateTitle = (value: string) => {
    if (!value.trim()) return "Необходимо указать название фильма";
    return "";
  };

  const validateYear = (value: string) => {
    if (!value) return "Необходимо указать год выпуска";
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    if (isNaN(year)) return "Введите корректный год";
    if (year < 1900) return "Год должен быть не раньше 1900";
    if (year > currentYear) return `Год не может быть больше ${currentYear}`;
    return "";
  };

  const validateDirector = (value: string) => {
    if (!value.trim()) return "Необходимо указать режиссера";
    return "";
  };

  const validateGenres = (value: EGenre[]) => {
    if (!value || value.length === 0)
      return "Необходимо указать хотя бы один жанр";
    return "";
  };

  const validateRating = (value: string) => {
    if (!value) return "Необходимо указать рейтинг";
    const ratingNum = parseFloat(value);
    if (ratingNum < 1) return "Рейтинг должен быть от 1 до 10";
    if (ratingNum > 10) return "Рейтинг должен быть от 1 до 10";
    return "";
  };

  const titleError = validateTitle(title);
  const yearError = validateYear(year);
  const directorError = validateDirector(director);
  const genresError = validateGenres(genres);
  const ratingError = validateRating(rating);

  const isFormValid =
    !titleError && !yearError && !directorError && !genresError && !ratingError;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Пожалуйста, исправьте ошибки в форме");
      return;
    }

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
    );
    onClose();
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
            width={250}
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
          <button className=" button submit_button" type="submit">
            <p>Сохранить</p>
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("modal")!,
  );
};

export default AddOrEditPopup;
