import styles from "./FilmsSection.module.css";
import FilmCard from "./FilmCard/FilmCard.tsx";
import FilmsNotFound from "./FilmsNotFound/FilmsNotFound.tsx";
import { useGetFilmsWithSync } from "../../hooks/useGetFilmsWithSync.ts";
import { useAppSelector } from "../../hooks/storeHooks.ts";

const FilmsSection = () => {
  const films = useAppSelector(store => store.main.films)
  const {isLoading, error, isFetching} = useGetFilmsWithSync();
  const showSkeleton = isLoading || isFetching;
  if (error) return null;
  return (
    <section>
      <ul className={styles.list}>
        {showSkeleton &&
          Array.from({ length: 8 }).map((_, index) => (
            <li key={"skeleton_" + index} className={styles.skeleton}></li>
          ))}
        {!showSkeleton &&
          films.length > 0 &&
          films.map((film) => (
            <li key={"film_" + film.id}>
              <FilmCard film={film} />
            </li>
          ))}
      </ul>
      {!showSkeleton && films.length === 0 && <FilmsNotFound />}
    </section>
  );
};

export default FilmsSection;
