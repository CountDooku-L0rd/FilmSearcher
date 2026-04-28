import styles from "./FilmCard.module.css";
import { type FilmsAPI } from "@yp-mentor/films-server-types";
import { useState } from "react";
import { genreMapping, IMAGE_NOT_EXIST } from "../../../constants/constants.ts";
import EditFilmButton from "./EditFilmButton/EditFilmButton.tsx";
import DeleteFilmButton from "./DeleteFilmButton/DeleteFilmButton.tsx";
import StatusFilmButton from "./StatusFilmButton/StatusFilmButton.tsx";

const FilmCard = ({
  film,
}: {
  film: Awaited<ReturnType<FilmsAPI["getFilms"]>>["data"][number];
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={film.image || IMAGE_NOT_EXIST}
        alt="Изображение фильма"
      />
      <div className={styles.title_container}>
        <p className={styles.title}>{film.title}</p>
        <p className={styles.year}>{film.year}</p>
      </div>
      <p className={styles.director}>{film.director}</p>
      <ul className={styles.genres}>
        {film.genres.slice(0, film.genres.length === 3 ? 3 : 2).map((genre) => (
          <li className={styles.genres_item} key={"genre_" + genre}>
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
                  <p
                    className={styles.genres_item_text2}
                    key={"tooltip_genre_" + genre}
                  >
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
        <EditFilmButton film={film} />
        <DeleteFilmButton filmId={film.id} />
        <StatusFilmButton filmId={film.id} filmStatus={film.status} />
      </div>
    </div>
  );
};

export default FilmCard;
