import styles from './AddFilmButton.module.css'

const AddFilmButton = ({onClick}: {onClick: () => void}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <span className={styles.button_svg}></span>
            Добавить фильм
        </button>
    )
}

export default AddFilmButton