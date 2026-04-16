import styles from './CustomSelect.module.css'
import type {CustomSelectProps} from "./props/CustomSelectProps.ts";
import {useClickOutside} from "../../hooks/useClickOutside.ts";
import {useState} from "react";

const CustomSelect = ({options, value, onChange, title, width}: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const ref = useClickOutside<HTMLDivElement>(() => {
        if (isOpen){
            setIsOpen(false);
        }
    })

    const handleTriggerClick = () => {
        if (!isOpen){
            setIsOpen(true);
        } else{
            setIsOpen(false);
        }
    }

    const handleCustomSelect = (option: {value: string; label: string}) => {
        onChange(option)
        setIsOpen(false);
    }
    return (
        <div ref={ref} className={styles.container}>
            <p className={styles.text}>{title}</p>
            <div className={styles.selector_input} onClick={handleTriggerClick} style={{width}}>
                <span>{value?.label}</span>
                <span className={`${styles.selector_input_svg} ${isOpen ? styles.svg_reverse : false}`}></span>
            </div>
            {isOpen && (
                <ul className={styles.selector_list}>
                    {options.map(option => (
                        <li className={`${styles.selector_elem} ${value?.value === option.value ? styles.selector_elem_active : false}`} key={option.value} onClick={() => handleCustomSelect(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CustomSelect