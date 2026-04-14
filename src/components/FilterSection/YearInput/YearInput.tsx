import styles from './YearInput.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks.ts";
import {setEndYear, setStartYear} from "../../../store/yearSlice.ts";
import * as React from "react";

const YearInput = () => {
    const {startYear, endYear} = useAppSelector(store => store.year);
    const dispatch = useAppDispatch();
    const handleStartYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            dispatch(setStartYear(null));
            return;
        }
        dispatch(setStartYear(Number(e.target.value)));
    }
    const handleEndYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            dispatch(setEndYear(null));
            return;
        }
        dispatch(setEndYear(Number(e.target.value)));
    }
    return(
        <div className={styles.container}>
            <p className={styles.text}>Год выпуска</p>
            <div className={styles.input_container}>
                <input value={startYear ? startYear : ''} className={styles.input} placeholder={'От'} type={'number'} onChange={handleStartYear}/>
                <input value={endYear ? endYear : ''} className={styles.input} placeholder={'До'} type={'number'} onChange={handleEndYear}/>
            </div>
        </div>
    )
}

export default YearInput;