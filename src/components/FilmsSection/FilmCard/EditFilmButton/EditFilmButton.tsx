import styles from './EditFilmButton.module.css'

const EditFilmButton = ({onClick} : {onClick: () => void}) => {
    return (
        <button className={styles.button} onClick={onClick}/>
    )
}

export default EditFilmButton