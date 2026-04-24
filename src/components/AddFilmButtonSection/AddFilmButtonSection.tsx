import type { EGenre, EStatus } from "@yp-mentor/films-server-types";
import AddFilmButton from "../AddFilmButton/AddFilmButton";
import AddOrEditPopup from "../AddOrEditPopup/AddOrEditPopup";
import { useState } from "react";
import { useGetFilms } from "../../hooks/useGetFilms";
import { filmService } from "../../api/FilmsService.ts";
import { showSuccessToast } from "../../toasts/toasts";
import styles from './AddFilmButtonSection.module.css'

const AddFilmButtonSection = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
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
      await filmService.createFilm({ body });
      showSuccessToast("Фильм успешно добавлен");
      getFilms();
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  };
  return (
    <section className={styles.container}>
      <AddFilmButton
        onClick={() => {
          setModalIsOpen(true);
        }}
      />
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

export default AddFilmButtonSection;
