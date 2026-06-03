import { useAppDispatch } from "../../../../hooks/storeHooks";
import styles from "./DeleteFilmButton.module.css";
import { useDeleteFilmMutation } from "../../../../hooks/useDeleteFilmMutation";

const DeleteFilmButton = ({ filmId }: { filmId: number }) => {
  const dispatch = useAppDispatch();
  const deleteFilm = useDeleteFilmMutation(filmId, dispatch);
  return (
    <button
      className={styles.button}
      onClick={() => deleteFilm.mutate()}
      disabled={deleteFilm.isPending}
    />
  );
};

export default DeleteFilmButton;
