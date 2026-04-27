import styles from './DeleteFilmButton.module.css'

const DeleteFilmButton = ({onClick} : {onClick: () => void}) => {
    return (
        <button className={styles.button} onClick={onClick}/>
    )
}

export default DeleteFilmButton