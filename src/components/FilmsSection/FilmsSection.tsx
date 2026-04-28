import styles from "./FilmsSection.module.css";
import FilmCard from "./FilmCard/FilmCard.tsx";
import { useAppSelector } from "../../hooks/storeHooks.ts";
import FilmsNotFound from "./FilmsNotFound/FilmsNotFound.tsx";

const FilmsSection = () => {
  const { films, isLoading, serverError } = useAppSelector(
    (store) => store.main,
  );
  if (serverError) return null;
  return (
    <section>
      <ul className={styles.list}>
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <li key={'skeleton_' + index} className={styles.skeleton}></li>
          ))}
        {!isLoading &&
          films.length > 0 &&
          films.map((film) => (
            <li key={'film_' + film.id}>
              <FilmCard film={film} />
            </li>
          ))}
      </ul>
      {!isLoading && films.length === 0 && <FilmsNotFound />}
    </section>
  );
};

export default FilmsSection;
