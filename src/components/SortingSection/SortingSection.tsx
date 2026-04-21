import styles from "./SortingSection.module.css";
import SearchInput from "./SearchInput/SearchInput.tsx";
import SortButton from "./SortButton/SortButton.tsx";
import AddFilmButton from "./AddFilmButton/AddFilmButton.tsx";
import { useState } from "react";
import AddOrEditPopup from "../AddOrEditPopup/AddOrEditPopup.tsx";
import type { EGenre, EStatus } from "@yp-mentor/films-server-types";
import FilmsService from "../../api/FilmsService.ts";
import { useGetFilms } from "../../hooks/useGetFilms.ts";

const SortingSection = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const filmService = new FilmsService();
  const { getFilms } = useGetFilms();
  const handleAdd = async (body: {
    title: string;
    director: string;
    year: number;
    genres: EGenre[];
    description?: string;
    image?: string;
    rating: number;
    status: EStatus;
  }) => {
    try {
      await filmService.createFilm(body['body']);
      getFilms();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <ul className={styles.list}>
        <li>
          <SearchInput />
        </li>
        <li>
          <div className={styles.buttons}>
            <SortButton buttonType={"filters"} />
            <SortButton buttonType={"sort"} />
          </div>
        </li>
        <li>
          <AddFilmButton
            onClick={() => {
              setModalIsOpen(true);
            }}
          />
        </li>
      </ul>
      {isModalOpen ? (
        <AddOrEditPopup
          onSubmit={handleAdd}
          isModalOpen={isModalOpen}
          onClose={() => {
            setModalIsOpen(false);
          }}
        />
      ) : null}
    </section>
  );
};

export default SortingSection;
