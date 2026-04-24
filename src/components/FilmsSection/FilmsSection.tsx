import styles from './FilmsSection.module.css'
import FilmCard from "./FilmCard/FilmCard.tsx";
import {useAppSelector} from "../../hooks/storeHooks.ts";
import Sceleton from '../Sceleton/Sceleton.tsx';
import FilmsNotFound from './FilmsNotFound/FilmsNotFound.tsx';

const FilmsSection = () => {
    const {films, isLoading} = useAppSelector(store => store.main);
    return (
        <section>
            <ul className={styles.list}>
                {isLoading && Array.from({length: 8}).map(() => <li><Sceleton/></li>)}
                {!isLoading && (films.length>0 && films.map(film => (
                    <li><FilmCard film={film} /></li>
                )))}
            </ul>
            {!isLoading && (films.length===0 && (<FilmsNotFound/>))}
        </section>
    )
}

export default FilmsSection;