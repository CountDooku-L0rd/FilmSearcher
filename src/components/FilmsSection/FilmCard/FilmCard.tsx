import styles from "./FilmCard.module.css";
import { EStatus, type FilmsAPI } from "@yp-mentor/films-server-types";
import { useState } from "react";
import { filmService } from "../../../api/FilmsService.ts";
import { useGetFilms } from "../../../hooks/useGetFilms.ts";

import { genreMapping } from "../../../constants/constants.ts";
import { showErrorToast, showSuccessToast } from "../../../toasts/toasts.ts";
import EditFilmButton from "./EditFilmButton/EditFilmButton.tsx";
import { useAppDispatch } from "../../../hooks/storeHooks.ts";
import { setData, setIsEditModalOpen } from "../../../store/modalSlice.ts";
import DeleteFilmButton from "./DeleteFilmButton/DeleteFilmButton.tsx";
import StatusFilmButton from "./StatusFilmButton/StatusFilmButton.tsx";

const FilmCard = ({
  film,
}: {
  film: Awaited<ReturnType<FilmsAPI["getFilms"]>>["data"][number];
}) => {
  const { getFilms } = useGetFilms();
  const dispatch = useAppDispatch();
  const handleDeleteClick = async (id: number) => {
    try {
      await filmService.deleteFilm({ id: id.toString() });
      showSuccessToast("Фильм успешно удалён");
      getFilms();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      } else {
        showErrorToast(error as string);
      }
      console.error(error);
    }
  };

  const handleStatusClick = async (id: number, status?: EStatus) => {
    try {
      await filmService.changeFilmStatus({
        body: {
          status:
            status === EStatus.in_plans ? EStatus.watched : EStatus.in_plans,
        },
        id: id.toString(),
      });
      showSuccessToast("Статус фильма успешно изменён");
      getFilms();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      } else {
        showErrorToast(error as string);
      }
      console.error(error);
    }
  };
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={film.image} alt="" />
      <div className={styles.title_container}>
        <p className={styles.title}>{film.title}</p>
        <p className={styles.year}>{film.year}</p>
      </div>
      <p className={styles.director}>{film.director}</p>
      <ul className={styles.genres}>
        {film.genres.slice(0, film.genres.length === 3 ? 3 : 2).map((genre) => (
          <li className={styles.genres_item}>
            <p className={styles.genres_item_text}>{genreMapping[genre]}</p>
          </li>
        ))}
        {film.genres.length > 3 && (
          <li
            className={styles.genres_item}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <p className={styles.genres_item_text}>...</p>
            {tooltipVisible && (
              <div className={styles.tooltip}>
                <div className={styles.tooltip_decor}></div>
                {film.genres.slice(2).map((genre, index) => (
                  <p className={styles.genres_item_text2} key={index}>
                    {genreMapping[genre]}
                    {index < film.genres.slice(2).length - 1 && ", "}
                  </p>
                ))}
              </div>
            )}
          </li>
        )}
      </ul>
      <p className={styles.descriprion}>{film.description}</p>
      <div className={styles.rating}>
        <div className={styles.star}>
          <div className={styles.star_svg}></div>
          <p className={styles.rating_text}>{film.rating}</p>
        </div>
        {film.status === "watched" ? (
          <div className={styles.watched}>
            <p className={styles.status_text}>Просмотрено</p>
          </div>
        ) : (
          <div className={styles.in_plans}>
            <p className={styles.status_text}>В планах</p>
          </div>
        )}
      </div>
      <div className={styles.line}></div>
      <div className={styles.buttons}>
        <EditFilmButton
          onClick={() => {
            dispatch(setData(film));
            dispatch(setIsEditModalOpen(true));
          }}
        />
        <DeleteFilmButton
          onClick={() => {
            handleDeleteClick(film.id);
          }}
        />
        <StatusFilmButton
          status={film.status}
          onClick={() => {
            handleStatusClick(film.id, film.status);
          }}
        />
      </div>
    </div>
  );
};

export default FilmCard;
