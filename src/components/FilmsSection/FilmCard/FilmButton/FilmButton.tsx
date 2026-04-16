import styles from './FilmButton.module.css'
import type {FilmButtonProps} from './props/FilmButtonProps.ts'
import {EStatus} from "../../../../constants/constants.ts";

const FilmButton = ({type, status, onClick}: FilmButtonProps) => {
    return (
        <button className={`${styles.button} ${type === 'edit' ? styles.edit : (type === 'delete' ? styles.delete : (status === EStatus.watched ? styles.watched : styles.in_plans))}`} onClick={onClick}>
        </button>
    )
}

export default FilmButton