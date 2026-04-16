import styles from './FilmsSection.module.css'
import FilmCard from "./FilmCard/FilmCard.tsx";
import {useAppSelector} from "../../hooks/storeHooks.ts";

const FilmsSection = () => {
    const {films} = useAppSelector(store => store.main);
    return (
        <section>
            <ul className={styles.list}>
                {films.map(film => (
                    <li><FilmCard film={film} /></li>
                ))}
            </ul>
        </section>
    )
}

export default FilmsSection;