import styles from "./FilmCard.module.css";
import { EGenre, EStatus, type FilmsAPI } from "@yp-mentor/films-server-types";
import FilmButton from "./FilmButton/FilmButton.tsx";
import { useState } from "react";
import FilmsService from "../../../api/FilmsService.ts";
import { useGetFilms } from "../../../hooks/useGetFilms.ts";
import AddOrEditPopup from "../../AddOrEditPopup/AddOrEditPopup.tsx";

const FilmCard = ({
  film,
}: {
  film: Awaited<ReturnType<FilmsAPI["getFilms"]>>["data"][number];
}) => {
  const filmService = new FilmsService();
  const { getFilms } = useGetFilms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteClick = async (id: number) => {
    try {
      await filmService.deleteFilm({ id: id.toString() });
      getFilms();
    } catch (error) {
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
      getFilms();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleEditSubmit = async (
    body: {
      title: string;
      director: string;
      year: number;
      genres: EGenre[];
      description?: string | undefined;
      image?: string | undefined;
      rating: number;
      status: EStatus;
    },
    id?: string | undefined,
  ) => {
    try {
      if (id) {
        await filmService.updateFilm({ body, id });
      }
      getFilms();
    } catch (error) {
      console.error(error);
    }
  };
  const genreMapping = {
    [EGenre.drama]: "Драма",
    [EGenre.comedy]: "Комедия",
    [EGenre.action]: "Экшен",
    [EGenre.fantasy]: "Фэнтези",
    [EGenre.thriller]: "Триллер",
    [EGenre.horror]: "Хоррор",
    [EGenre.melodrama]: "Мелодрама",
    [EGenre.adventure]: "Приключение",
    [EGenre.detective]: "Детектив",
    [EGenre.all]: "Все жанры",
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
        <FilmButton id={film.id} type={"edit"} onClick={handleEditClick} />
        <FilmButton id={film.id} type={"delete"} onClick={handleDeleteClick} />
        <FilmButton
          id={film.id}
          type={"status"}
          status={film.status}
          onClick={handleStatusClick}
        />
      </div>
      {isModalOpen ? (
        <AddOrEditPopup
          data={film}
          onSubmit={handleEditSubmit}
          onClose={() => {
            setIsModalOpen(false);
          }}
          isModalOpen={isModalOpen}
        />
      ) : null}
    </div>
  );
};

export default FilmCard;
