import styles from './CustomSelector.module.css'
import type {CustomSelectorProps} from "./props/CustomSelectorProps.ts";
import {useClickOutside} from "../../hooks/useClickOutside.ts";
import {useId, useState} from "react";
import {useCustomSelect} from "../../hooks/useCustomSelect.ts";

const CustomSelector = ({options, value, onChange, title, width}: CustomSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {activeId, setActiveId} = useCustomSelect();
    const id = useId();

    const ref = useClickOutside<HTMLDivElement>(() => {
        if (isOpen){
            setIsOpen(false);
            if (activeId === id) setActiveId(null);
        }
    })

    const handleTriggerClick = () => {
        if (!isOpen){
            setActiveId(id);
            setIsOpen(true);
        } else{
            setIsOpen(false);
            setActiveId(null);
        }
    }
    if (activeId!== id && isOpen){
        setIsOpen(false);
    }

    const handleCustomSelect = (option: {value: string; label: string}) => {
         onChange(option)
        setIsOpen(false);
        setActiveId(null)
    }
    return (
        <div ref={ref} className={styles.container}>
            <p className={styles.text}>{title}</p>
            <div className={styles.selector_input} onClick={handleTriggerClick} style={{width: width}}>
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

export default CustomSelector