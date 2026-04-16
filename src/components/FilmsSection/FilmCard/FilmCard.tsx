import styles from './FilmCard.module.css'
import type {FilmsAPI} from "@yp-mentor/films-server-types";
import {EStatus} from "../../../constants/constants.ts";
import FilmButton from "./FilmButton/FilmButton.tsx";


const FilmCard = ({film}: {film:Awaited<ReturnType<FilmsAPI['getFilms']>>['data'][number]}) => {
    const handleClick = () => {
        console.log(film);
    }
    return (
        <div className={styles.container}>
            <img className={styles.image} src={film.image} alt="" />
            <div className={styles.title_container}>
               <p className={styles.title}>{film.title}</p>
                <p className={styles.year}>{film.year}</p>
            </div>
            <p className={styles.director}>{film.director}</p>
            <ul>
                {film.genres.map(genre => {
                    <li>{genre}</li>
                })}
            </ul>
            <p className={styles.descriprion}>{film.description}</p>
            <div className={styles.rating}>
                <div className={styles.star}>
                    <div className={styles.star_svg}></div>
                    <p className={styles.rating_text}>{film.rating}</p>
                </div>
                {film.status === EStatus.watched ? <div className={styles.watched}><p className={styles.status_text}>Просмотрено</p></div> : <div className={styles.in_plans}><p className={styles.status_text}>В планах</p></div> }
            </div>
            <div className={styles.line}></div>
            <div className={styles.buttons}>
                <FilmButton type={'edit'} onClick={handleClick}/>
                <FilmButton type={'delete'} onClick={handleClick}/>
                <FilmButton type={'status'} status={film.status} onClick={handleClick}/>
            </div>
        </div>
    )
}

export default FilmCard;