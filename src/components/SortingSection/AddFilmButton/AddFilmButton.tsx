import styles from './AddFilmButton.module.css'

const AddFilmButton = () => {
    return (
        <button className={styles.button}>
            <span className={styles.button_svg}></span>
            Добавить фильм
        </button>
    )
}

export default AddFilmButton