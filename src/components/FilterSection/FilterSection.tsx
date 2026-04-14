import styles from './FilterSection.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks.ts";
import CustomSelector from "../CustomSelector/CustomSelector.tsx";
import {setGenreValue} from "../../store/genreSlice.ts";
import {setStatusValue} from "../../store/statusSlice.ts";
import {setRatingValue} from "../../store/ratingSlice.ts";
import {genreOptions, ratingOptions, statusOptions} from "../../constants/constants.ts";
import YearInput from "./YearInput/YearInput.tsx";
import {setEndYear, setStartYear} from "../../store/yearSlice.ts";

const FilterSection = () => {
    const { isSortOpen, isFilterOpen} = useAppSelector(store => store.sort);
    const dispatch = useAppDispatch();
    const {genreValue} = useAppSelector(store => store.genre);
    const {statusValue} = useAppSelector(store => store.status);
    const {ratingValue} = useAppSelector(store => store.rating)
    const handleGenre = (option: { value:string, label:string}) =>{
        dispatch(setGenreValue({ value: option.value, label: option.label }));
    }
    const handleStatus = (option: { value: string, label:string }) => {
        dispatch(setStatusValue({ value: option.value, label: option.label }));
    }
    const handleRating = (option: { value: string, label:string }) => {
        dispatch(setRatingValue({ value: option.value, label: option.label }));
    }
    const handleClearFilters = () =>{
        dispatch(setGenreValue({ value: 'allGenres', label: 'Все жанры' }));
        dispatch(setStatusValue({ value: 'allStatuses', label: 'Все статусы' }));
        dispatch(setRatingValue({ value: 'allRatings', label: 'Любой рейтинг' }));
        dispatch(setStartYear(null));
        dispatch(setEndYear(null));
    }
    return (
        <>
            {isSortOpen || isFilterOpen ? <section className={styles.section}>
                {isSortOpen &&
                    <>

                    </>
                }
                {isFilterOpen &&
                    <>
                        <CustomSelector options={genreOptions} value={genreValue} onChange={handleGenre} title={'Жанр'} width={224}/>
                        <CustomSelector options={statusOptions} value={statusValue} onChange={handleStatus} title={'Статус просмотра'} width={145}/>
                        <CustomSelector options={ratingOptions} value={ratingValue} onChange={handleRating} title={'Минимальный рейтинг'} width={235}/>
                        <YearInput/>
                        <button className={styles.button} onClick={handleClearFilters}>Сбросить фильтры</button>
                    </>
                }
            </section> : <section/>}
        </>
    )
}

export default FilterSection