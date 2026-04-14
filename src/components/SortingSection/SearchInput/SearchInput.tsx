import styles from './SearchInput.module.css'

const SearchInput = () =>{
    return(
            <label className={styles.label}>
                <input className={styles.input} placeholder={'Поиск по названию, режиссеру или описанию'}/>
                <span className={styles.search_svg}></span>
            </label>
    )
}

export default SearchInput;