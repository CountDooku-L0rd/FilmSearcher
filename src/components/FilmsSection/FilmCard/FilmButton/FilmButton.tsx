import { EStatus } from '@yp-mentor/films-server-types'
import { EFilmButtonTypes } from '../../../../constants/constants.ts'
import styles from './FilmButton.module.css'
import type {FilmButtonTypes} from './types/FilmButtonTypes.ts'

const FilmButton = ({id, type, status, onClick}: FilmButtonTypes) => {
    return (
        <button className={`${styles.button} ${type === EFilmButtonTypes.edit ? styles.edit : (type === EFilmButtonTypes.delete ? styles.delete : (status === EStatus.watched ? styles.watched : styles.in_plans))}`}
                onClick={() => {
                    onClick(id, status)
                }}>
        </button>
    )
}

export default FilmButton