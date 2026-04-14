import styles from './SortingSection.module.css'
import SearchInput from "./SearchInput/SearchInput.tsx";
import SortButton from "./SortButton/SortButton.tsx";
import AddFilmButton from "./AddFilmButton/AddFilmButton.tsx";

const SortingSection = () => {
    return (
        <>
            <ul className={styles.list}>
                <li>
                    <SearchInput/>
                </li>
                <li>
                    <div className={styles.buttons}>
                        <SortButton buttonType={'filters'}/>
                        <SortButton buttonType={'sort'}/>
                    </div>
                </li>
                <li>
                    <AddFilmButton/>
                </li>
            </ul>
        </>
    )
}

export default SortingSection;