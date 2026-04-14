import styles from './SortButton.module.css'
import {useAppDispatch} from "../../../hooks/storeHooks.ts";
import {toggleFilterOpen, toggleSortOpen} from "../../../store/sortSlice.ts";

const SortButton = ({buttonType} : {buttonType: string}) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <button className={styles.button} onClick={() => {
                if (buttonType === 'filters') {
                    dispatch(toggleFilterOpen())
                } else {
                    dispatch(toggleSortOpen())
                }
            }}>
                <span className={buttonType==='filters' ? styles.filter_button : styles.sort_button}></span>
                <span>{buttonType==='filters' ? 'Фильтры' : 'Сортировка'}</span>
            </button>
        </>
    )
}

export default SortButton