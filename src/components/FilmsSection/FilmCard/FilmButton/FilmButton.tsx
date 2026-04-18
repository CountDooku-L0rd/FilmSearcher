import styles from './FilmButton.module.css'
import type {FilmButtonProps} from './props/FilmButtonProps.ts'
import {EStatus} from "@yp-mentor/films-server-types";

const FilmButton = ({id, type, status, onClick}: FilmButtonProps) => {
    return (
        <button className={`${styles.button} ${type === 'edit' ? styles.edit : (type === 'delete' ? styles.delete : (status === 'watched' ? styles.watched : styles.in_plans))}`}
                onClick={() => {
                    status ? onClick(id, status) : onClick(id)
                }}>
        </button>
    )
}

export default FilmButton